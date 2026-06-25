package com.srsyduts.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.srsyduts.card.usercards.UserCard;
import com.srsyduts.card.usercards.UserCardsService;
import com.srsyduts.card.vocab.VocabService;

@CrossOrigin(origins = "*") // Prevents browser CORS blocks 
@RestController // Tell spring that this accepts http requests
public class SRSController {
    private final JwtUtil jwtUtil;
    private final UserCardsService userCardsService;
    private final VocabService vocabService;

    public SRSController(JwtUtil jwtUtil, UserCardsService userCardsService, VocabService vocabService) {
        this.jwtUtil = jwtUtil;
        this.userCardsService = userCardsService;
        this.vocabService = vocabService;
    }

    @PostMapping("api/introduce")
    public String introduceCard(@RequestHeader("Authorization") String authHeader,
            @RequestBody IntroduceRequest request) {

        // Takes two params, 
        // Gives the userCard section introductions to the card 
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        // Before posting to database VALIDATE!
        // Check if the card the user is trying to introduce is even available for them, or hasn't been introduced before.

        // If the card does exist
        if (!userCardsService.existsByUserIdAndVocabId(uuid, request.getCardId())) {
            // Check type.
            if (request.getCardType().compareTo("kanji") == 0) {
                // ADD KANJI HERE
                makeKanjiCard(uuid, request);
                return "Added kanji to user_cards, id: " + request.getCardId();
            }
            else if (request.getCardType().compareTo("vocab") == 0) {
                // Check if the vocabs roots are learned
                if (vocabService.isVocabReadyForUser(uuid, request.getCardId())) {
                    // ADD VOCAB HERE
                    makeVocabCard(uuid, request);
                    return "Added vocab to user_cardsm, id: " + request.getCardId();
                } 
                return "Vocab isn't ready for review, id: " + request.getCardId();
            } else {
                return "type does not match kanji or vocab: " + request.getCardType();
            }
        } else {
            return "Card already exists in user_cards";
        }
    }

    private void makeKanjiCard(UUID uuid, IntroduceRequest request) {
        System.out.println("MAKING KANJI");
        UserCard card = new UserCard();
        card.setUserId(uuid);
        card.setVocabId(request.getCardId());
        card.setCardType(request.getCardType());
        card.setDirection(null);
        card.setSrsLevel((short) 0);
        userCardsService.save(card);
    }

    private void makeVocabCard(UUID uuid, IntroduceRequest request) {
        UserCard writing = new UserCard();
        writing.setUserId(uuid);
        writing.setVocabId(request.getCardId());
        writing.setSrsLevel((short) 0);
        writing.setCardType("writing");
        writing.setDirection("hira_jpn");
        userCardsService.save(writing); // Set Writing

        UserCard typing1 = new UserCard();
        typing1.setUserId(uuid);
        typing1.setVocabId(request.getCardId());
        typing1.setSrsLevel((short) 0);
        typing1.setCardType("typing");
        typing1.setDirection("jpn_eng");
        userCardsService.save(typing1);
        
        UserCard typing2 = new UserCard();
        typing2.setUserId(uuid);
        typing2.setVocabId(request.getCardId());
        typing2.setSrsLevel((short) 0);
        typing2.setCardType("typing");
        typing2.setDirection("jpn_hira");
        userCardsService.save(typing2);
    }

    @PostMapping("api/srs/writingCorrect")
    public String writingCorrect(@RequestHeader("Authorization") String authHeader,
            @RequestBody WritingRequest request) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));
        // Validate first if this card can be even be updated.
        // UserCardService.updateCard
        if (userCardsService.writingIsReady(uuid, request.getCardId(), request.getCardType())) {
            // Run srs algorithm thingy 
            // update userCard
        } else {
            return "Failed to update card.";
        }
        return "Success, added card: " + request.getCardId() + " " + request.getCardType();
    }
}