package com.srsyduts.study;

import lombok.Getter;

@Getter
public class Summary {
    // Introduce creates three seperate cards. 
    private int newKanji; 
    private int newVocab;
    private int dueWriting;
    private int dueTyping;
    private int[] statArr;
    private long totalCount;

    public Summary(int newKanji, int newVocab, int writing, int typing, int[] statArr, long totalCount) {
        this.newKanji = newKanji;
        this.newVocab = newVocab;
        this.dueWriting = writing;
        this.dueTyping = typing;
        this.statArr = statArr;
        this.totalCount = totalCount;
    }
}   
