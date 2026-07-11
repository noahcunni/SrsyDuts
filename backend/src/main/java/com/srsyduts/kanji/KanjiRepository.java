package com.srsyduts.kanji;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KanjiRepository extends JpaRepository<Kanji, Long> {
    @Query(value = """
    SELECT k.* FROM kanji k
    WHERE
        NOT EXISTS (
            SELECT 1 FROM user_cards uc
            WHERE uc.vocab_id = k.id
            AND uc.user_id = :userId
            AND uc.card_type = 'kanji'
        )
    ORDER BY k.id
    LIMIT :limit
    """, nativeQuery = true)
    List<Kanji> getReadyKanjiForUser(@Param("userId") UUID userId, @Param("limit") int limit);
    // Grabs card with no history (only new cards)

    @Query(value = """
    SELECT k.* FROM kanji k
    JOIN user_cards uc ON uc.vocab_id = k.id
    WHERE
        uc.user_id = :userId
        AND uc.card_type = 'kanji'
        AND (uc.next_review IS NULL OR uc.next_review < NOW())
    ORDER BY k.id
    """, nativeQuery = true)
    List<Kanji> getWritingKanjiForUser(@Param("userId") UUID userId);
    // Get due kanji cards

    // ------
    boolean existsByKanji(String kanji);
    Kanji findByKanji(String kanji);
}
