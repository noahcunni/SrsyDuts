import React, { useEffect, useState } from "react";
import { LessonKanjiCard, LessonVocabCard } from "../LessonCardContainer";

import styles from './Intro.module.css';

function buildQueue(cards) {
  const kanjiCards = cards.newKanji.map(card => ({
    type: "kanji",
    meaning: card.meaning,
    onyomi: card.onyomi,
    kunyomi: card.kunyomi,
    back: card.kanji,
  }));

  const vocabCards = cards.newVocab.map(card => ({
    type: "vocab",
    eng: card.english,
    hira: card.hiragana,
    back: card.jpn,
  }));
  return [...kanjiCards, ...vocabCards];
}

function Intro({ cards, next }) {
    const [queue, setQueue] = useState(() => buildQueue(cards));
    const [ i, setIndex ] = useState(0);

    function iterateForward() {
        if (i < queue.length - 1) {
            setIndex(i + 1);
        }
        console.log('Index, Type: ' + i + ' ' + queue[i].type);
    }

    function iterateBackward() {
        if (i > 0) {
            setIndex(i - 1);
        }
        console.log('Index, Type: ' + i + ' ' + queue[i].type);
    }

    if (!queue)
        return <p>Loading new cards...</p>

    if (queue.length === 0) 
        return <p>No new cards to review!</p>

    let type = queue[i].type.charAt(0).toUpperCase() + queue[i].type.slice(1).toLowerCase();

    return(
        <div className={styles.page}>
            <div className={styles.progress}>
                <div>
                    <p>progress bar goes here...</p>
                </div>
            </div>


            <div className={styles.cardContainer}>
                <h1 className={`${type === "Kanji" ? styles.kanjiType : styles.vocabType}`}>
                    {type}</h1>
                {type === 'Kanji' && <KanjiContainer card={queue[i]}/>}
                {type === 'Vocab' && <VocabContainer card={queue[i]}/>}
            
                <div className={styles.buttons}>
                    {<button className={`${i === 0 ? styles.buttonDisabled : styles.backButton}`} onClick={() => iterateBackward()}>← Back</button>}
                    {i !== queue.length - 1 && <button className={styles.nextButton} onClick={() => iterateForward()}>Next →</button>}
                    {i === queue.length - 1 && <button className={styles.finButton} onClick={() => next()}>To Quiz →</button>}
                </div>
            </div>
        </div>
    );
}

function VocabContainer({card}) {
    return(
        <div className={styles.displayContainer}>
            <p className={styles.vocabLabel}>JPN</p>
            <p className={styles.displayVocab} style={{ fontSize: `${260 / card.back.length}px` }}>{card.back}</p>

            <div className={styles.displayBack}>
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Hiragana:</p>
                    <p className={styles.displayValue}>{card.hira}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>English:</p>
                    <p className={styles.displayValue}>{card.eng}</p>
                </div>
            </div>
        </div>
    );
}

function KanjiContainer({card}) {
    return(
        <div className={styles.displayContainer}>
            <p className={styles.displayKanji}>{card.back}</p>
            <div className={styles.displayBack}>
                
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Kunyomi: </p>
                    <p className={styles.displayValue}>{card.kunyomi}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Onyomi:</p> 
                    <p className={styles.displayValue}>{card.onyomi}</p>
                </div>
                
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Meaning: </p>
                    <p className={styles.displayValue}>{card.meaning.charAt(0).toUpperCase() + card.meaning.slice(1)}</p>
                </div>
            </div>
        </div>
    );
}

export default Intro