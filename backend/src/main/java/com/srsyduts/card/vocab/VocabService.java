package com.srsyduts.card.vocab;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class VocabService {

    private final VocabRepository vocabRepository;

    public VocabService(VocabRepository vocabRepository) {
        this.vocabRepository = vocabRepository;
    }

    public List<Vocab> getReadyVocabForUser(UUID userId, int limit) {
        return vocabRepository.findReadyVocabForUser(userId, limit);
    }

    public boolean isVocabReadyForUser(UUID userId, Long vocabId) {
        return vocabRepository.isVocabReadyForUser(userId, vocabId);
    }
}