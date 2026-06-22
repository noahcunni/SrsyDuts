package com.srsyduts.card;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Batch {
    private UUID uuid;
    private NewCards newCards;
}
