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

    public List<Vocab> getWritingVocabForUser(UUID userId) {
        return vocabRepository.getWritingVocabForUser(userId);
    }

    public List<TypingVocab> getTypingVocabForUser(UUID userId) {
        return vocabRepository.getTypingVocabForUser(userId);
    }

    public String getTypingAnswer(Long vocabId, String direction) {
        return vocabRepository.getTypingAnswer(vocabId, direction);
    }

    public boolean compareTypingAnswer(String userAnswer, Long vocabId, String direction) {
        String correct = vocabRepository.getTypingAnswer(vocabId, direction);
        if (correct == null || userAnswer == null) return false;
        return correct.trim().equalsIgnoreCase(userAnswer.trim());
    }

    public long countAll() {
        return vocabRepository.count() * 3;
    }

    //----
    public Vocab save(Vocab vocab) {
        return vocabRepository.save(vocab); }

    public boolean existsByJpn(String jpn) {
        return vocabRepository.existsByJpn(jpn); }

    public void linkKanji(Long vocabId, Long kanjiId) {
        vocabRepository.linkKanji(vocabId, kanjiId); }
}