package com.srsyduts.card.kanji;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class KanjiService {

    private final KanjiRepository kanjiRepository;

    public KanjiService(KanjiRepository kanjiRepository) {
        this.kanjiRepository = kanjiRepository;
    }

    public List<Kanji> getAllKanji() {
        return kanjiRepository.findAll();
    }

    public Kanji getKanjiById(Long id) {
        return kanjiRepository.findById(id).orElseThrow();
    }

    public List<Kanji> getReadyKanjiForUser(UUID userId, int limit) {
        return kanjiRepository.getReadyKanjiForUser(userId, limit);
    }
}