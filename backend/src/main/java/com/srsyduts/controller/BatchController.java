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
    public Object getSummary(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        int newVocab = vocabService.getReadyVocabForUser(uuid, 8).size();
        int newKanji = kanjiService.getReadyKanjiForUser(uuid, 3).size();

        int dueVocab = 0;
        int dueKanji = 0;

        Summary cardSummary = new Summary(newKanji, newVocab, dueKanji, dueVocab);
        return cardSummary;
    }
}
