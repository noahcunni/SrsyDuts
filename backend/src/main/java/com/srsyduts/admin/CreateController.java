package com.srsyduts.admin;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.srsyduts.kanji.Kanji;
import com.srsyduts.kanji.KanjiService;
import com.srsyduts.vocab.Vocab;
import com.srsyduts.vocab.VocabService;

@CrossOrigin(origins = "*")
@RestController
public class CreateController {

    private final KanjiService kanjiService;
    private final VocabService vocabService;

    public CreateController(KanjiService kanjiService, VocabService vocabService) {
        this.kanjiService = kanjiService;
        this.vocabService = vocabService;
    }

    // ---------- Endpoints ----------

    @PostMapping("/api/create/kanji")
    public Kanji createKanji(@RequestBody Kanji kanji) {
        validateKanji(kanji);
        kanji.setId(null);
        return kanjiService.save(kanji);
    }

    @PostMapping("/api/create/vocab")
    @Transactional   // vocab insert + all kanji_vocab links commit together, or not at all
    public Vocab createVocab(@RequestBody Vocab vocab) {
        Set<Character> roots = validateVocab(vocab);
        vocab.setId(null);
        Vocab saved = vocabService.save(vocab);

        for (char c : roots) {
            Long kanjiId = kanjiService.findByKanji(String.valueOf(c)).getId();
            vocabService.linkKanji(saved.getId(), kanjiId);
        }
        return saved;
    }

    // ---------- Validation ----------

    private void validateKanji(Kanji k) {
        if (isBlank(k.getKanji()))   throw badRequest("Kanji is required.");
        if (isBlank(k.getMeaning())) throw badRequest("Meaning is required.");
        if (isBlank(k.getKunyomi()) && isBlank(k.getOnyomi()))
            throw badRequest("At least one reading (kunyomi or onyomi) is required.");

        String kanji = k.getKanji().trim();
        if (kanjiService.existsByKanji(kanji)) throw conflict("Kanji already exists: " + kanji);
        k.setKanji(kanji);
    }

    /** Returns the distinct root kanji so the caller can build the kanji_vocab links. */
    private Set<Character> validateVocab(Vocab v) {
        if (isBlank(v.getJpn()) || isBlank(v.getHiragana()) || isBlank(v.getEnglish()))
            throw badRequest("All vocab fields are required.");

        String jpn = v.getJpn().trim();
        if (vocabService.existsByJpn(jpn)) throw conflict("Vocab already exists: " + jpn);

        Set<Character> roots = extractKanji(jpn);
        for (char c : roots) {
            if (!kanjiService.existsByKanji(String.valueOf(c)))
                throw badRequest("Missing root kanji '" + c + "'. Add it in the kanji section first.");
        }
        v.setJpn(jpn);
        return roots;
    }

    // ---------- Helpers ----------

    private boolean isBlank(String s) { return s == null || s.isBlank(); }

    private ResponseStatusException badRequest(String msg) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, msg);
    }

    private ResponseStatusException conflict(String msg) {
        return new ResponseStatusException(HttpStatus.CONFLICT, msg);
    }

    /** Distinct CJK ideograph (kanji) characters in a string — skips kana and punctuation. */
    private Set<Character> extractKanji(String text) {
        Set<Character> result = new LinkedHashSet<>();
        for (char c : text.toCharArray()) {
            if (c >= 0x4E00 && c <= 0x9FFF) result.add(c);
        }
        return result;
    }
}