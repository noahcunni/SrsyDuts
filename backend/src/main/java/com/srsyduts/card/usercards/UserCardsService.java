package com.srsyduts.card.usercards;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class UserCardsService {

    private final UserCardsRepository userCardsRepository;

    public UserCardsService(UserCardsRepository userCardsRepository) {
        this.userCardsRepository = userCardsRepository;
    }

    public List<UserCard> getAllUserCards() {
        return userCardsRepository.findAll();
    }

    public UserCard getUserCardById(Long id) {
        return userCardsRepository.findById(id).orElseThrow();
    }

    public List<UserCard> findByUserId(UUID userId) {       
        return userCardsRepository.findByUserId(userId);       
    }

    public boolean existsByUserIdAndVocabIdAndCardType(UUID userId, Long vocabId, String cardType) {
        return userCardsRepository.existsByUserIdAndVocabIdAndCardType(userId, vocabId, cardType);
    }

    public boolean writingIsReady(UUID userId, Long cardId, String cardType, String cardDirection) {
        return userCardsRepository.writingIsReady(userId, cardId, cardType, cardDirection);
    }

    public UserCard getWritingUserCard(UUID userId, Long cardId, String cardType, String direction) {
        return userCardsRepository.findByUserIdAndVocabIdAndCardTypeAndDirection(userId, cardId, cardType, direction);
    }

    public boolean typingIsReady(UUID userId, Long cardId, String direction) {
        return userCardsRepository.writingIsReady(userId, cardId, "vocab", direction);
    }

    public UserCard getTypingUserCard(UUID userId, Long cardId, String direction) {
        return userCardsRepository.findByUserIdAndVocabIdAndCardTypeAndDirection(userId, cardId, "vocab", direction);
    }

    public SrsSummary getSrsSummary(UUID userId) {
        return userCardsRepository.getSrsSummary(userId);
    }

    public int countIntroducedToday(UUID userId, String cardType) {
        return userCardsRepository.countIntroducedToday(userId, cardType);
    }

    public void save(UserCard card) {
        userCardsRepository.save(card);
    }
}