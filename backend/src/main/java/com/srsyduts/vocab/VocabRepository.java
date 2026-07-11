package com.srsyduts.vocab;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabRepository extends JpaRepository<Vocab, Long> {

    @Query(value = """
        SELECT v.* FROM vocab v
        WHERE
            NOT EXISTS (
                SELECT 1 FROM user_cards uc
                WHERE uc.vocab_id = v.id
                AND uc.user_id = :userId
                AND uc.card_type = 'vocab'
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

    @Query(value = """
    SELECT v.* FROM vocab v
    JOIN user_cards uc ON uc.vocab_id = v.id
    WHERE
        uc.user_id = :userId
        AND uc.card_type = 'vocab'
        AND uc.direction = 'writing'
        AND (uc.next_review IS NULL OR uc.next_review < NOW())
    ORDER BY v.id
    """, nativeQuery = true)
    List<Vocab> getWritingVocabForUser(@Param("userId") UUID userId);

    @Query(value = """
        SELECT v.id, v.english, v.hiragana, v.jpn, uc.direction
        FROM vocab v
        JOIN user_cards uc ON uc.vocab_id = v.id
        WHERE uc.user_id = :userId
        AND uc.card_type = 'vocab'
        AND uc.direction IN ('jpn_eng', 'jpn_hira')
        AND (uc.next_review IS NULL OR uc.next_review < NOW())
        ORDER BY v.id
        """, nativeQuery = true)
    List<TypingVocab> getTypingVocabForUser(@Param("userId") UUID userId);

    /**
     * Returns answer of typing card.
     * 
     * Used to compare user answer with a typing card
     */
    @Query(value = """
        SELECT CASE
            WHEN :direction = 'jpn_eng'  THEN v.english
            WHEN :direction = 'jpn_hira' THEN v.hiragana
        END
        FROM vocab v
        WHERE v.id = :vocabId
        """, nativeQuery = true)
    String getTypingAnswer(@Param("vocabId") Long vocabId, @Param("direction") String direction);

    

    // -----
    boolean existsByJpn(String jpn);

    @Modifying
    @Query(value = "INSERT INTO kanji_vocab (vocab_id, kanji_id) VALUES (:vocabId, :kanjiId)",
       nativeQuery = true)
    void linkKanji(@Param("vocabId") Long vocabId, @Param("kanjiId") Long kanjiId);
}