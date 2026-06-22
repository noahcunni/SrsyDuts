package com.srsyduts.card.vocab;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface VocabRepository extends JpaRepository<Vocab, Long> {

    @Query(value = """
        SELECT v.* FROM vocab v
        WHERE
            NOT EXISTS (
                SELECT 1 FROM user_cards uc
                WHERE uc.vocab_id = v.id
                AND uc.user_id = :userId
                AND uc.card_type IN ('writing', 'typing')
            )
            AND
            NOT EXISTS (
                SELECT 1 FROM kanji_vocab kv
                WHERE kv.vocab_id = v.id
                AND NOT EXISTS (
                    SELECT 1 FROM user_cards uc
                    WHERE uc.vocab_id = kv.kanji_id
                    AND uc.user_id = :userId
                    AND uc.card_type = 'kanji'
                    AND uc.srs_level >= 4
                )
            )
        LIMIT :limit
    """, nativeQuery = true)
    List<Vocab> findReadyVocabForUser(@Param("userId") UUID userId, @Param("limit") int limit);

    @Query(value = """
        SELECT CASE WHEN COUNT(*) = 0 THEN true ELSE false END
        FROM kanji_vocab kv
        WHERE kv.vocab_id = :vocabId
        AND NOT EXISTS (
            SELECT 1 FROM user_cards uc
            WHERE uc.vocab_id = kv.kanji_id
            AND uc.user_id = :userId
            AND uc.card_type = 'kanji'
            AND uc.srs_level >= 4
        )
    """, nativeQuery = true)
    boolean isVocabReadyForUser(@Param("userId") UUID userId, @Param("vocabId") Long vocabId);
}