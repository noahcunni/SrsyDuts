package com.srsyduts.card.usercards;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCardsRepository extends JpaRepository<UserCard, Long>  {
    List<UserCard> findByUserId(UUID userId);
    boolean existsByUserIdAndVocabId(UUID userId, Long vocabId);

    @Query(value = """
    SELECT EXISTS (
        SELECT 1 FROM user_cards uc
        WHERE uc.user_id = :userId
            AND uc.vocab_id = :cardId
            AND uc.card_type = :cardType
            AND uc.next_review < NOW()
    )
    """, nativeQuery = true)
    boolean writingIsReady(@Param("userId") UUID userId,
        @Param("cardId") Long cardId,
        @Param("cardType") String cardType);
}