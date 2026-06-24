import React, { useState } from "react";
import { LessonKanjiCard, LessonVocabCard } from "../../LessonCardContainer";

import styles from './Intro.module.css';

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
        <div className={styles.page}>
            <div className={styles.progress}>
                <div>
                    <p>progress bar goes here...</p>
                </div>
            </div>


            <div className={styles.cardContainer}>
                <h1 className={styles.cardType}>{order.charAt(0).toUpperCase() + order.slice(1).toLowerCase()}</h1>
                {order === "KANJI" && <KanjiContainer newKanji={newKanji[index]}/>}
                {order === "VOCAB" && <VocabContainer newVocab={newVocab[index]}/>}
            </div>

            <div className={styles.buttons}>
                <button className={styles.backButton} onClick={() => iterateBackward()}>Back</button>
                {order !== "END" && <button className={styles.nextButton} onClick={() => iterateForward()}>Next</button>}
                {order === "END" && <button className={styles.finButton} onClick={() => next()}>FINISHED</button>}
            </div>
        </div>
    );
}

function VocabContainer({newVocab}) {
    return(
        <div>
            <div className={styles.kanjiCharacter}>{newVocab.jpn}</div>
            <div className={styles.kanjiDisplay}>
                <p>Hiragana: {newVocab.hiragana}</p>
                <p>English: {newVocab.english}</p>
            </div>
        </div>
    );
}

function KanjiContainer({newKanji}) {
    return(
        <>
            <div className={styles.kanjiCharacter}><h1>{newKanji.kanji}</h1></div>
            <div className={styles.kanjiDisplay}>
                <p>Kunyomi: {newKanji.kunyomi}</p>
                <p>Onyomi: {newKanji.onyomi}</p>
                <p>Meaning: {newKanji.meaning}</p>
            </div>
        </>
    );
}

function iterate() {
    
}

export default Intro