package com.srsyduts.study;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srsyduts.kanji.Kanji;
import com.srsyduts.kanji.KanjiService;
import com.srsyduts.usercards.SrsSummary;
import com.srsyduts.usercards.UserCardsService;
import com.srsyduts.vocab.TypingVocab;
import com.srsyduts.vocab.Vocab;
import com.srsyduts.vocab.VocabService;

@RestController // Tell spring that this accepts http requests
public class CardsController {
    private final UserCardsService userCardsService;
    private final KanjiService kanjiService;
    private final VocabService vocabService;

    public CardsController(UserCardsService userCardsService, KanjiService kanjiService, VocabService vocabService) {
        this.userCardsService = userCardsService;
        this.kanjiService = kanjiService;
        this.vocabService = vocabService;
    }

    @GetMapping("/api/cards/summary")
    public Summary getSummary(Authentication auth) {
        UUID uuid = UUID.fromString(auth.getName());

        int newVocabLimit = Math.max(0, userCardsService.VOCAB_LIMIT - userCardsService.countIntroducedToday(uuid, "vocab"));
        int newKanjiLimit = Math.max(0, userCardsService.KANJI_LIMIT - userCardsService.countIntroducedToday(uuid, "kanji"));

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
    public NewCards getNewCards(Authentication auth) {
        UUID uuid = UUID.fromString(auth.getName());

        int newVocabCount = userCardsService.VOCAB_LIMIT - userCardsService.countIntroducedToday(uuid, "vocab");
        int newKanjiCount = userCardsService.KANJI_LIMIT - userCardsService.countIntroducedToday(uuid, "kanji");

        List<Vocab> newVocab = vocabService.getReadyVocabForUser(uuid, newVocabCount);
        List<Kanji> newKanji = kanjiService.getReadyKanjiForUser(uuid, newKanjiCount);

        return new NewCards(newKanji, newVocab);
    }

    @GetMapping("/api/cards/writing")
    public WritingCards getWritingCards(Authentication auth) {
        UUID uuid = UUID.fromString(auth.getName());

        List<Kanji> kanji = kanjiService.getWritingKanjiForUser(uuid);
        List<Vocab> vocab = vocabService.getWritingVocabForUser(uuid);
        return new WritingCards(kanji, vocab);
    }

    @GetMapping("/api/cards/typing")
    public TypingCards getTypingCards(Authentication auth) {
        UUID uuid = UUID.fromString(auth.getName());
        List<TypingVocab> vocab = vocabService.getTypingVocabForUser(uuid);

        return new TypingCards(vocab);
    }
}
