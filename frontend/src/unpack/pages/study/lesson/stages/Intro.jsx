import React, { useEffect, useState } from "react";
import { LessonKanjiCard, LessonVocabCard } from "../LessonCardContainer";

import styles from './Intro.module.css';

function Intro({ cards, next }) {
    const [ index, setIndex ] = useState(0);
    const [ order, setOrder ] = useState("VOCAB");

    const newVocab = cards.newVocab;
    const newKanji = cards.newKanji;

    const vocabSize = newVocab.length;
    const kanjiSize = newKanji.length;

    useEffect(() => {
        if (vocabSize === 0)
            setOrder('KANJI');
    }, [vocabSize]);

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
                {order !== "END" && <h1 className={`${order === "KANJI" ? styles.kanjiType : styles.vocabType}`}>
                    {order.charAt(0).toUpperCase() + order.slice(1).toLowerCase()}</h1>}
                {order === "END" && <h1 className={styles.cardType}>Quiz</h1>}
                {order === "KANJI" && newKanji[index] && <KanjiContainer newKanji={newKanji[index]}/>}
                {order === "VOCAB" && newVocab[index] && <VocabContainer newVocab={newVocab[index]}/>}
            
                <div className={styles.buttons}>
                    <button className={styles.backButton} onClick={() => iterateBackward()}>← Back</button>
                    {order !== "END" && <button className={styles.nextButton} onClick={() => iterateForward()}>Next →</button>}
                    {order === "END" && <button className={styles.finButton} onClick={() => next()}>To Quiz →</button>}
                </div>
            </div>
        </div>
    );
}

function VocabContainer({newVocab}) {
    return(
        <div className={styles.displayContainer}>
            <p className={styles.displayVocab}>{newVocab.jpn}</p>

            <div className={styles.displayBack}>
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Hiragana:</p>
                    <p className={styles.displayValue}>{newVocab.hiragana}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>English:</p>
                    <p className={styles.displayValue}>{newVocab.english}</p>
                </div>
            </div>
        </div>
    );
}

function KanjiContainer({newKanji}) {
    return(
        <div className={styles.displayContainer}>
            <p className={styles.displayKanji}>{newKanji.kanji}</p>
            <div className={styles.displayBack}>
                
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Kunyomi: </p>
                    <p className={styles.displayValue}>{newKanji.kunyomi}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Onyomi:</p> 
                    <p className={styles.displayValue}>{newKanji.onyomi}</p>
                </div>
                
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Meaning: </p>
                    <p className={styles.displayValue}>{newKanji.meaning.charAt(0).toUpperCase() + newKanji.meaning.slice(1)}</p>
                </div>
            </div>
        </div>
    );
}

export default Intro