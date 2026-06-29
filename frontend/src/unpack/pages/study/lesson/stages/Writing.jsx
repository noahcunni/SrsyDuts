import { useEffect, useState } from "react";
import { UserAuth } from "../../../../../context/AuthContext";
import { introduce } from "../../../SRS/SRSController";
import styles from './Writing.module.css';

function buildQueue(cards) {
  const kanjiCards = cards.newKanji.map(card => ({
    id: card.id,
    type: "kanji",
    meaning: card.meaning,
    onyomi: card.onyomi,
    kunyomi: card.kunyomi,
    back: card.kanji,
  }));

  const vocabCards = cards.newVocab.map(card => ({
    id: card.id,
    type: "vocab",
    eng: card.english,
    hira: card.hiragana,
    back: card.jpn,
  }));
  return [...kanjiCards, ...vocabCards]
    .sort(() => Math.random() - 0.5);
}


function Writing({ cards, next }) {
    const [queue, setQueue] = useState(() => buildQueue(cards));
    const [ reveal, setReveal ] = useState(false);

    const { session } = UserAuth();

    useEffect(() => {
        function onKey(e) {
            if (e.key === " ") 
                setReveal(true);
            e.preventDefault();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey); 
    }, []);
    
    function advance(correct) {
        const restOfQueue = queue.slice(1);
        if (correct) {
             // introduce(session, queue[0]); UNCOMMENT THIS WHEN DONE!!!!
            setQueue(restOfQueue);
        } else {
            setQueue([...restOfQueue, queue[0]]);
        }

        setReveal(false);
    }

    if (queue.length === 0) 
        return(<p>Done</p>);

    return(
        <div className={styles.page}>
            <div className={styles.progress}>
                <div>
                    <p>progress bar goes here...</p>
                </div>
            </div>

            <div className={styles.cardContainer}>
                <h1 className={styles.stage}>Writing</h1>


                {queue[0].type === "kanji" && <KanjiCard card={queue[0]} reveal={reveal} setReveal={setReveal}/>}
                {queue[0].type === "vocab" && <VocabCard card={queue[0]} reveal={reveal} setReveal={setReveal}/>}

                <div className={styles.answerButtons}>
                    <button className={styles.answerIncorrect} onClick={() => {
                            if (!reveal) 
                                return;
                            advance(false)}
                        }>False</button>
                    <button className={styles.answerCorrect} onClick={() => {
                        if (!reveal)
                            return;
                        advance(true)
                    }}>True</button>
                </div>
            </div>
        </div>
    );
}   

function KanjiCard({ card, reveal, setReveal }) {   
    const meaning = card.meaning.charAt(0).toUpperCase() + card.meaning.slice(1);



    return(
        <div className={styles.display}>
     
            <p className={styles.displayLabel}>MEANING</p>
            <p className={styles.displayMeaning}>{meaning}</p>

            <div className={styles.displayReadings}> 
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>KUN'YOMI</p>
                    <p className={styles.displayValue}>{card.kunyomi}</p>
                </div>
    
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>ON'YOMI</p>
                    <p className={styles.displayValue}>{card.onyomi}</p>
                </div>
            </div>


            <button type="button" className={styles.writeBox}
                    onClick={() => setReveal(true)}>
                {reveal
                    ? <span className={styles.writeKanji} style={{ fontSize: `${260 / card.back.length}px`}}>
                    {card.back}</span>
                    : <span className={styles.writeHint}>✍︎<br/>Write it<br/>on paper<br/>tap to flip</span>}
            </button>

        </div>
    );
}

function VocabCard({ card, reveal, setReveal }) {
    return(
        <div>

            <div className={styles.displayReadings}>
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>English:</p>
                    <p className={styles.displayValue}>{card.eng}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>Hiragana:</p>
                    <p className={styles.displayValue}>{card.hira}</p>
                </div>

            </div>

            <button type="button" className={styles.writeBox}
                    onClick={() => setReveal(!reveal)}>
                {reveal
                    ? <span className={styles.writeKanji} style={{ fontSize: `${260 / card.back.length}px` }}>
                {card.back}</span>
                    : <span className={styles.writeHint}>✍︎<br/>Write it<br/>on paper<br/>tap to flip</span>}
            </button>
        </div>
    );
}

export default Writing