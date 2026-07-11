package com.srsyduts.srs;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.srsyduts.security.JwtUtil;
import com.srsyduts.usercards.UserCard;
import com.srsyduts.usercards.UserCardsService;
import com.srsyduts.vocab.VocabService;

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

        if (request.getCardType().compareTo("kanji") == 0 && userCardsService.KANJI_LIMIT <= userCardsService.countIntroducedToday(uuid, "kanji")) 
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
        "Cannot introduce: Reached daily kanji lesson limit.");


        if (request.getCardType().compareTo("vocab") == 0 && userCardsService.VOCAB_LIMIT <= userCardsService.countIntroducedToday(uuid, "vocab")) 
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
        "Cannot introduce: Reached daily vocab lesson limit.");


        // If the card does exist
        if (!userCardsService.existsByUserIdAndVocabIdAndCardType(uuid, request.getCardId(), request.getCardType())) {
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
                    return "Added vocab to user_cards, id: " + request.getCardId();
                } 
                throw new ResponseStatusException(HttpStatus.CONFLICT, 
                    "Vocab isn't ready for review, id: " + request.getCardId());
            } else {
                throw new ResponseStatusException(HttpStatus.CONFLICT, 
                    "type does not match kanji or vocab: " + request.getCardType());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, 
                "Card already exists in user_cards: " + request.getCardId());
        }
    }

    private void makeKanjiCard(UUID uuid, IntroduceRequest request) {
        System.out.println("MAKING KANJI");
        UserCard card = new UserCard();
        card.setUserId(uuid);
        card.setVocabId(request.getCardId());
        card.setCardType(request.getCardType());
        card.setDirection("writing");
        card.setSrsLevel((short) 0);
        userCardsService.save(card);
    }

    private void makeVocabCard(UUID uuid, IntroduceRequest request) {
        UserCard writing = new UserCard();
        writing.setUserId(uuid);
        writing.setVocabId(request.getCardId());
        writing.setSrsLevel((short) 0);
        writing.setCardType("vocab");
        writing.setDirection("writing");
        userCardsService.save(writing); // Set Writing

        UserCard typing1 = new UserCard();
        typing1.setUserId(uuid);
        typing1.setVocabId(request.getCardId());
        typing1.setSrsLevel((short) 0);
        typing1.setCardType("vocab");
        typing1.setDirection("jpn_eng");
        userCardsService.save(typing1);
        
        UserCard typing2 = new UserCard();
        typing2.setUserId(uuid);
        typing2.setVocabId(request.getCardId());
        typing2.setSrsLevel((short) 0);
        typing2.setCardType("vocab");
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
        if (userCardsService.writingIsReady(uuid, request.getCardId(), request.getCardType(), "writing")) {
            UserCard userCard = userCardsService.getWritingUserCard(uuid, request.getCardId(), request.getCardType(), "writing");
            setWritingSRS(userCard, true);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Card is not due");
        }
        return "Success, added card: " + request.getCardId() + " " + request.getCardType();
    }

    @PostMapping("api/srs/writingIncorrect")
    public String writingIncorrect(@RequestHeader("Authorization") String authHeader,
            @RequestBody WritingRequest request) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));
        // Validate first if this card can be even be updated.
        // UserCardService.updateCard
        if (userCardsService.writingIsReady(uuid, request.getCardId(), request.getCardType(), "writing")) {
            UserCard userCard = userCardsService.getWritingUserCard(uuid, request.getCardId(), request.getCardType(), "writing");
            setWritingSRS(userCard, false);
        } else {
            return "Failed to update card, reason: Next_Review > Now";
        }
        return "Success, added card: " + request.getCardId() + " " + request.getCardType();
    }

    private void setWritingSRS(UserCard userCard, boolean correct) {
        short srs = userCard.getSrsLevel();
        OffsetDateTime next = userCard.getNextReview();
        OffsetDateTime last = userCard.getLastReview();
        OffsetDateTime now = OffsetDateTime.now();

        if (correct) {
            if (srs == 0) {
                userCard.setLastReview(now);
                userCard.setNextReview(setNextDate(srs));
                userCard.setSrsLevel((short) (srs + 1));
            } else if (last.compareTo(next) >= 0) { 
                // Last is a sentinal value and tells the card to derank in this case 
                userCard.setLastReview(now);
                userCard.setNextReview(setNextDate(srs));
                userCard.setSrsLevel((short) (srs - 1));

            } else if (next.compareTo(now) < 0) {
                userCard.setLastReview(now);
                userCard.setNextReview(setNextDate(srs));
                userCard.setSrsLevel((short) (srs + 1));
            } 
        }
        else {
            // Incorrect.
            userCard.setLastReview(now);
            userCard.setNextReview(now);
        }
        userCardsService.save(userCard);
    }

    private OffsetDateTime setNextDate(short srs) {
        return switch (srs) {
            case 0 -> OffsetDateTime.now().plusHours(4);
            case 1 -> OffsetDateTime.now().plusHours(8);
            case 2 -> OffsetDateTime.now().plusDays(1);
            case 3 -> OffsetDateTime.now().plusDays(2);
            case 4 -> OffsetDateTime.now().plusDays(7);
            case 5 -> OffsetDateTime.now().plusDays(14);
            case 6 -> OffsetDateTime.now().plusDays(30);
            case 7 -> OffsetDateTime.now().plusDays(120);
            case 8 -> OffsetDateTime.now().plusDays(270);
            default -> OffsetDateTime.now().plusDays(540);
        };
    }

    @PostMapping("api/srs/typingAnswer")
    public Map typingAnswer(@RequestHeader ("Authorization") String authHeader,
        @RequestBody TypingRequest request)
    {

        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        UserCard userCard = userCardsService.getTypingUserCard(uuid, request.getCardId(), request.getDirection());

        if (userCard == null || !isDue(userCard))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Card is not due");

        setWritingSRS(userCard, request.isCorrect());
        return Map.of("message", "Success, card processed");
    }

    private boolean isDue(UserCard userCard) {
        return userCard.getNextReview() == null
            || userCard.getNextReview().isBefore(OffsetDateTime.now());
    }
}

