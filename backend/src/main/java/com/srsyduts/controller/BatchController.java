package com.srsyduts.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.srsyduts.card.Batch;
import com.srsyduts.card.NewCards;
import com.srsyduts.card.kanji.Kanji;
import com.srsyduts.card.kanji.KanjiService;
import com.srsyduts.card.usercards.Summary;
import com.srsyduts.card.usercards.UserCardsService;
import com.srsyduts.card.vocab.TypingVocab;
import com.srsyduts.card.vocab.Vocab;
import com.srsyduts.card.vocab.VocabService;

@CrossOrigin(origins = "*") // Prevents browser CORS blocks 
@RestController // Tell spring that this accepts http requests
public class BatchController {
    private final JwtUtil jwtUtil;

    private final UserCardsService userCardsService;
    private final KanjiService kanjiService;
    private final VocabService vocabService;

    public BatchController(UserCardsService userCardsService, KanjiService kanjiService, VocabService vocabService, JwtUtil jwtUtil) {
        this.userCardsService = userCardsService;
        this.kanjiService = kanjiService;
        this.vocabService = vocabService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/api/getBatch") // Where the request comes from
    public Batch getBatch(@RequestHeader("Authorization") String authHeader) { 
        // Return a giant JSON containing all the relevant cards for the user.
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        List<Vocab> newVocab = vocabService.getReadyVocabForUser(uuid, 10);
        List<Kanji> newKanji = kanjiService.getReadyKanjiForUser(uuid, 10);

        return new Batch(uuid, new NewCards(newKanji, newVocab));
    } 

    @GetMapping("/api/cards/summary")
    public Summary getSummary(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        int newVocab = vocabService.getReadyVocabForUser(uuid, 8).size();
        int newKanji = kanjiService.getReadyKanjiForUser(uuid, 3).size();

        int writing = vocabService.getWritingVocabForUser(uuid).size() 
            + kanjiService.getWritingKanjiForUser(uuid).size();
        int typing = vocabService.getTypingVocabForUser(uuid).size();

        Summary cardSummary = new Summary(newKanji, newVocab, writing, typing);
        return cardSummary;
    }

    @GetMapping("/api/cards/newCards")
    public NewCards getNewCards(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        List<Vocab> newVocab = vocabService.getReadyVocabForUser(uuid, 8);
        List<Kanji> newKanji = kanjiService.getReadyKanjiForUser(uuid, 3);

        return new NewCards(newKanji, newVocab);
    }

    @GetMapping("/api/cards/writing")
    public WritingCards getWritingCards(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        List<Kanji> kanji = kanjiService.getWritingKanjiForUser(uuid);
        List<Vocab> vocab = vocabService.getWritingVocabForUser(uuid);
        return new WritingCards(kanji, vocab);
    }

    @GetMapping("/api/cards/typing")
    public TypingCards getTypingCards(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));


        List<TypingVocab> vocab = vocabService.getTypingVocabForUser(uuid);

        return new TypingCards(vocab);
    }
}
