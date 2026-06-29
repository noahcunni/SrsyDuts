package com.srsyduts.controller;

import java.util.List;

import com.srsyduts.card.vocab.TypingVocab;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TypingCards {
    List<TypingVocab> vocab;
}
