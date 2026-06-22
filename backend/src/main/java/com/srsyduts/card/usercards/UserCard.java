package com.srsyduts.card.usercards;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_cards")
public class UserCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  

    @Column(name = "user_id", columnDefinition = "uuid")
    private UUID userId;  

    @Column(name = "vocab_id")
    private Long vocabId;  

    @Column(name = "card_type")
    private String cardType;  

    private String direction;

    @Column(name = "srs_level")
    private Short srsLevel;  

    @Column(name = "next_review")
    private OffsetDateTime nextReview;  

    @Column(name = "last_review")
    private OffsetDateTime lastReview;  
}
