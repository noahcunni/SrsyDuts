package com.srsyduts.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.srsyduts.card.NewCards;
import com.srsyduts.card.kanji.Kanji;
import com.srsyduts.card.kanji.KanjiService;
import com.srsyduts.card.usercards.SrsSummary;
import com.srsyduts.card.usercards.Summary;
import com.srsyduts.card.usercards.UserCardsService;
import com.srsyduts.card.vocab.TypingVocab;
import com.srsyduts.card.vocab.Vocab;
import com.srsyduts.card.vocab.VocabService;

@CrossOrigin(origins = "*") // Prevents browser CORS blocks 
@RestController // Tell spring that this accepts http requests
public class BatchController {
    private static final int KANJI_LIMIT = 3;
    private static final int VOCAB_LIMIT = 8;
    
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

    @GetMapping("/api/cards/summary")
    public Summary getSummary(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        int newVocabLimit = VOCAB_LIMIT - userCardsService.countIntroducedToday(uuid, "vocab");
        int newKanjiLimit = KANJI_LIMIT - userCardsService.countIntroducedToday(uuid, "kanji");

        int newKanjiCount = kanjiService.getReadyKanjiForUser(uuid, newKanjiLimit).size();
        int newVocabCount = vocabService.getReadyVocabForUser(uuid, newVocabLimit).size(); 

        //int newVocab = vocabService.getReadyVocabForUser(uuid, 8).size();
        //int newKanji = kanjiService.getReadyKanjiForUser(uuid, 3).size();

        int writing = vocabService.getWritingVocabForUser(uuid).size() 
            + kanjiService.getWritingKanjiForUser(uuid).size();
        int typing = vocabService.getTypingVocabForUser(uuid).size();

        SrsSummary srsStats = userCardsService.getSrsSummary(uuid);

        int[] statArr = new int[7];
        statArr[0] = srsStats.getNew();
        statArr[1] = srsStats.getBeginner();
        statArr[2] = srsStats.getIntermediate();
        statArr[3] = srsStats.getMastered();
        statArr[4] = srsStats.getFluent();
        statArr[5] = srsStats.getVocabMastered();
        statArr[6] = srsStats.getKanjiMastered();
        
        long totalCards = vocabService.countAll() + kanjiService.countAll();

        Summary cardSummary = new Summary(newKanjiCount, newVocabCount, writing, typing, statArr, totalCards);
        return cardSummary;
    }

    @GetMapping("/api/cards/newCards")
    public NewCards getNewCards(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        UUID uuid = UUID.fromString(jwtUtil.extractUuid(token));

        int newVocabCount = VOCAB_LIMIT - userCardsService.countIntroducedToday(uuid, "vocab");
        int newKanjiCount = KANJI_LIMIT - userCardsService.countIntroducedToday(uuid, "kanji");

        List<Vocab> newVocab = vocabService.getReadyVocabForUser(uuid, newVocabCount);
        List<Kanji> newKanji = kanjiService.getReadyKanjiForUser(uuid, newKanjiCount);

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
