package com.srsyduts.card.usercards;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCardsRepository extends JpaRepository<UserCard, Long>  {
    List<UserCard> findByUserId(UUID userId);
    boolean existsByUserIdAndVocabId(UUID userId, Long vocabId);
}