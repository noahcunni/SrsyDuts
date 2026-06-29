package com.srsyduts.controller;

import lombok.Data;
@Data
public class TypingRequest {
    private long cardId;
    private String direction;
    
    private String answer;
}
