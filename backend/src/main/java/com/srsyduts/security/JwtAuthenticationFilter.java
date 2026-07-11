package com.srsyduts.security;

import java.io.IOException;
import java.net.URI;
import java.security.interfaces.ECPublicKey;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String ADMIN_UUID = "1cff3197-8c86-4647-8fa4-a3d09534c64f";
    private final String JWKS_URL = "https://mhwvagjiwhvydgeisrnw.supabase.co/auth/v1/.well-known/jwks.json";

    private final JwkProvider provider; 

    public JwtAuthenticationFilter() {
        try {
            provider = new JwkProviderBuilder(URI.create(JWKS_URL).toURL())
                    .cached(3, 24, TimeUnit.HOURS)   // keep up to 3 keys for 24h
                    .build();
        } catch (java.net.MalformedURLException e) {
            throw new IllegalStateException("Bad JWKS URL", e);
        }
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String bearerToken = request.getHeader("Authorization");

        // 2. ONLY run verification if a token was actually provided
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            try {
                String token = bearerToken.substring(7);
                
                DecodedJWT jwt = JWT.decode(token);
                ECPublicKey publicKey = (ECPublicKey) provider.get(jwt.getKeyId()).getPublicKey();
                Algorithm algorithm = Algorithm.ECDSA256(publicKey, null);
                JWTVerifier verifier = JWT.require(algorithm).build();
                
                DecodedJWT verifiedJwt = verifier.verify(token);
                String supabaseUserId = verifiedJwt.getSubject();

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(supabaseUserId, null,
                            supabaseUserId.equals(ADMIN_UUID)
                                ? List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                                : List.of());
                
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                System.out.println("ES256 Cryptographic Verification Failed: " + e.getMessage());
                SecurityContextHolder.clearContext();
                
                // If they SENT a token but it's expired/corrupted, reject them with a 401 JSON
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Invalid or expired session token.\"}");
                return; 
            }
        }

        // 3. CRITICAL: This MUST be completely outside the IF block.
        // If there's no token, let them pass right through to public endpoints!
        filterChain.doFilter(request, response);
    }
}
