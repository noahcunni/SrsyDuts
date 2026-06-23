package com.srsyduts.card.usercards;

import lombok.Getter;

@Getter
public class Summary {
    // Introduce creates three seperate cards. 
    private int newKanji; 
    private int newVocab;
    private int dueVocab;
    private int dueKanji;

    public Summary(int newKanji, int newVocab, int dueKanji, int dueVocab) {
        this.newKanji = newKanji;
        this.newVocab = newVocab;
        this.dueVocab = dueVocab;
        this.dueKanji = dueKanji;
    }
}
