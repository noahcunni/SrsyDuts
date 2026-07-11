package com.srsyduts.study;

import java.util.List;

import com.srsyduts.vocab.TypingVocab;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TypingCards {
    List<TypingVocab> vocab;
}
