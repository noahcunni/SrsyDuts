package com.srsyduts.security;

import java.security.interfaces.ECPublicKey;

import org.springframework.stereotype.Component;

import com.nimbusds.jose.jwk.ECKey;

import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {

    private final ECPublicKey publicKey;

    public JwtUtil() throws Exception {
        String jwk = "{\"x\":\"41IXlOw9bCwgsZrU6-fmS0vqx4J4Dr3raxCX8BfrAMA\"," +
                     "\"y\":\"iFiycdvj_OtfubtN4DRGUJSONptZ6LNRS7oYuhKXjFU\"," +
                     "\"alg\":\"ES256\",\"crv\":\"P-256\",\"kty\":\"EC\"}";

        ECKey ecKey = ECKey.parse(jwk);
        this.publicKey = ecKey.toECPublicKey();
    }

    public String extractUuid(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }
}