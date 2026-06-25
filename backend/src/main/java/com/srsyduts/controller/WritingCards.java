package com.srsyduts.controller;

import java.util.List;

import com.srsyduts.card.kanji.Kanji;
import com.srsyduts.card.vocab.Vocab;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WritingCards {
    List<Kanji> kanji;
    List<Vocab> vocab;
}
