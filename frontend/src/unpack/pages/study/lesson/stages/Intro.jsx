import React, { useState } from "react";
import { LessonKanjiCard, LessonVocabCard } from "../../LessonCardContainer";

function Intro({ cards, next }) {
    const [ index, setIndex ] = useState(0);
    const [ order, setOrder ] = useState("VOCAB");

    const newVocab = cards.newVocab;
    const newKanji = cards.newKanji;

    const vocabSize = newVocab.length;
    const kanjiSize = newKanji.length;

    function iterateForward() {
        if (order === "VOCAB" && index + 1 >= vocabSize) {
            setIndex(0);
            setOrder("KANJI");
        } else if (order === "KANJI" && index + 1 >= kanjiSize) {
            setIndex(0);
            setOrder("END");
        } else {
            setIndex(index + 1);
        }
    }

    function iterateBackward() {
        if (index - 1 < 0) {
            if (order === "KANJI") {
                setOrder("VOCAB");
                setIndex(vocabSize - 1);
            } else if (order === "END") {
                setOrder("KANJI");
                setIndex(kanjiSize - 1);
            }
        } else {
            setIndex(index - 1);
        }
    }

    return(
        <div>
            <h1>INTRO STAGE</h1>
            {order === "KANJI" && <KanjiContainer newKanji={newKanji[index]}/>}
            {order === "VOCAB" && <VocabContainer newVocab={newVocab[index]}/>}

            <button onClick={() => iterateBackward()}>Back</button>
            {order !== "END" && <button onClick={() => iterateForward()}>Next</button>}
            {order === "END" && <button onClick={() => next()}>FINISHED</button>}
        </div>
    );
}

function VocabContainer({newVocab}) {
    return(
        <div>
            <p>JPN: {newVocab.jpn}</p>
            <p>Hiragana: {newVocab.hiragana}</p>
            <p>English: {newVocab.english}</p>
        </div>
    );
}

function KanjiContainer({newKanji}) {
    return(
        <div>
            <p>Kanji: {newKanji.kanji}</p>
            <p>Kunyomi: {newKanji.kunyomi}</p>
            <p>Onyomi: {newKanji.onyomi}</p>
            <p>Meaning: {newKanji.meaning}</p>
        </div>
    );
}

function iterate() {
    
}

export default Intro