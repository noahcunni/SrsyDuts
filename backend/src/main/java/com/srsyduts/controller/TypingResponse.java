package com.srsyduts.controller;

import lombok.Data;

@Data
public class TypingResponse {
    
    private boolean correct;
    private String realAnswer;

    public TypingResponse(boolean correct, String realAnswer) {
        this.correct = correct;
        this.realAnswer = realAnswer;
    }
}
