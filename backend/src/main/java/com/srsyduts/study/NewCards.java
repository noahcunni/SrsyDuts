package com.srsyduts.study;

import java.util.List;

import com.srsyduts.kanji.Kanji;
import com.srsyduts.vocab.Vocab;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewCards {
    List<Kanji> newKanji;
    List<Vocab> newVocab;
}
