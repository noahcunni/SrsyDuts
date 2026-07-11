package com.srsyduts.usercards;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCardsRepository extends JpaRepository<UserCard, Long>  {
    List<UserCard> findByUserId(UUID userId);
    boolean existsByUserIdAndVocabIdAndCardType(UUID userId, Long vocabId, String cardType);
    UserCard findByUserIdAndVocabIdAndCardTypeAndDirection(UUID userId, Long vocabId, String cardType, String direction);

    @Query(value = """
    SELECT EXISTS (
        SELECT 1 FROM user_cards uc
        WHERE uc.user_id = :userId
            AND uc.vocab_id = :cardId
            AND uc.card_type = :cardType
            AND uc.direction = :cardDirection
            AND (uc.next_review IS NULL OR uc.next_review < NOW())
    )   
    """, nativeQuery = true)
    boolean writingIsReady(@Param("userId") UUID userId,
        @Param("cardId") Long cardId,
        @Param("cardType") String cardType,
        @Param("cardDirection") String direction);


    @Query(value = """
    SELECT
        COUNT(*) FILTER (WHERE uc.srs_level BETWEEN 0 AND 2) AS new,
        COUNT(*) FILTER (WHERE uc.srs_level BETWEEN 3 AND 4) AS beginner,
        COUNT(*) FILTER (WHERE uc.srs_level BETWEEN 5 AND 6) AS intermediate,
        COUNT(*) FILTER (WHERE uc.srs_level = 7)             AS mastered,
        COUNT(*) FILTER (WHERE uc.srs_level >= 8)            AS fluent,
        COUNT(*) FILTER (WHERE uc.srs_level >= 7 AND uc.card_type = 'vocab') AS "vocabMastered",
        COUNT(*) FILTER (WHERE uc.srs_level >= 7 AND uc.card_type = 'kanji') AS "kanjiMastered"   
    FROM user_cards uc
    WHERE uc.user_id = :userId
    """, nativeQuery = true)
    SrsSummary getSrsSummary(@Param("userId") UUID userId);

    @Query(value = """
        SELECT COUNT(DISTINCT uc.vocab_id) FROM user_cards uc
        WHERE uc.user_id = :userId
            AND uc.card_type = :cardType
            AND uc.created_at >= date_trunc('day', now())
    """, nativeQuery = true)
    int countIntroducedToday(@Param("userId") UUID userId, @Param("cardType") String cardType);
}



