package com.srsyduts.card.usercards;

import lombok.Getter;

@Getter
public class Summary {
    // Introduce creates three seperate cards. 
    private int newKanji; 
    private int newVocab;
    private int dueWriting;
    private int dueTyping;

    public Summary(int newKanji, int newVocab, int writing, int typing) {
        this.newKanji = newKanji;
        this.newVocab = newVocab;
        this.dueWriting = writing;
        this.dueTyping = typing;
    }
}
