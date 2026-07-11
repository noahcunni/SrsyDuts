package com.srsyduts.kanji;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kanji")
public class KanjiController {

    private final KanjiService kanjiService;

    public KanjiController(KanjiService kanjiService) {
        this.kanjiService = kanjiService;
    }

    @GetMapping
    public List<Kanji> getAllKanji() {
        return kanjiService.getAllKanji();
    }

    @GetMapping("/{id}")
    public Kanji getKanjiById(@PathVariable Long id) {
        return kanjiService.getKanjiById(id);
    }
}