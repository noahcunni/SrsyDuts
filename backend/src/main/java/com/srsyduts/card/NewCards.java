package com.srsyduts.card;

import java.util.List;

import com.srsyduts.card.kanji.Kanji;
import com.srsyduts.card.vocab.Vocab;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewCards {
    List<Kanji> newKanji;
    List<Vocab> newVocab;
}
