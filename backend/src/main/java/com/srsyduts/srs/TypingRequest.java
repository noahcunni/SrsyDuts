package com.srsyduts.srs;

import lombok.Data;
@Data
public class TypingRequest {
    private long cardId;
    private String direction;
    private boolean correct;
}
