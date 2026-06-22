package com.srsyduts.card.kanji;
    
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "kanji")
public class Kanji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String kanji;
    private String onyomi;
    private String kunyomi;
    private String meaning;

    public Long getId() {
        return id;
    }

    public String getKanji() {
        return kanji;
    }

    public String getOnyomi() {
        return onyomi;
    }

    public String getKunyomi() {
        return kunyomi;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setKanji(String kanji) {
        this.kanji = kanji;
    }

    public void setOnyomi(String onyomi) {
        this.onyomi = onyomi;
    }

    public void setKunyomi(String kunyomi) {
        this.kunyomi = kunyomi;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}