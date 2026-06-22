package com.srsyduts.controller;

import java.util.List;

import com.srsyduts.card.usercards.UserCard;

/**
 * The purpose of this class is to get all available new cards for the user
 */
public class NewCardInteract {
    private String uuid;
    private int threshold;

    public NewCardInteract(String uuid, int threshold) {
        this.uuid = uuid;
        this.threshold = threshold;

        getVocab();
        getKanji();
    }

    private void getVocab() {
        // In order to get the vocab, we need all the users relevant kanji.
        
    }

    private void getKanji() {

    }

    /**
     * final method, returns the cards.
     */
    public List<UserCard> getNewCards() {
        return null;
    }   
}
