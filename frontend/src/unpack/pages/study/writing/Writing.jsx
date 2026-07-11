import { useEffect, useState } from "react"; 
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import { UserDeck } from "../../../../context/CardContext";
import { writingCorrect, writingIncorrect } from '../../../../api/srs.js';
import styles from './Writing.module.css';
import { Link } from "react-router";

function buildQueue(cards) {
  const kanjiCards = cards.kanji.map(card => ({
    type: "kanji",
    id: card.id,
    front: {
        meaning: card.meaning,
        kunyomi: card.kunyomi,
        onyomi: card.onyomi
    },
    back: card.kanji,
  }));

  const vocabCards = cards.vocab.map(card => ({
    type: "vocab",
    id: card.id,
    front: {
        eng: card.english,
        hira: card.hiragana
    },
    back: card.jpn,
  }));

  return [...kanjiCards, ...vocabCards]
    .sort(() => Math.random() - 0.5);
}

function Writing() { 
    const [message, setMessage] = useState('Loading writing info...'); 
    const [ cards, setCards ] = useState();
    const { session } = UserAuth();
    const { writing, loadWriting } = UserDeck();
    const [queue, setQueue] = useState();
    const [ reveal, setReveal ] = useState(false);
    const [saveFailed, setSaveFailed] = useState(false);

    const [ totalNumber, setTotalNumber ] = useState(); 
            
        async function advance(correct) {
            setReveal(false);
            const restOfQueue = queue.slice(1);

            if (correct) {
                setQueue(restOfQueue);
                setTotalNumber(totalNumber - 1);
            } else {
                setQueue([...restOfQueue, queue[0]]);
            }

            let saved = undefined;
            if (correct) 
                saved = await writingCorrect(session, queue[0].id, queue[0].type);
            else
                saved = await writingIncorrect(session, queue[0].id, queue[0].type);

            if (!saved) setSaveFailed(true);
        }
    
        useEffect(() => {
            loadWriting();
        }, []);

        // Stops error
        useEffect(() => {
            if (writing) {
                const q = buildQueue(writing);
                setQueue(q);
                setTotalNumber(q.length);
            }

        }, [writing]);



    if (!queue)
        return <p className={styles.body}>loading writing cards...</p>

    if (queue.length === 0) {
        return <Finish/>
    }

    let type = queue[0].type.charAt(0).toUpperCase() + queue[0].type.slice(1);

    return(
        <div className={styles.page}>
            <p>There are {totalNumber} cards left</p>
            {saveFailed && <p className={styles.saveWarning}>A review failed to save — unsaved cards will reappear next session.</p>}

            <div className={styles.cardContainer}>

                <h1 className={`${type === "Vocab" ? styles.vocabType : styles.kanjiType}`}>Writing: {type}</h1>


                {queue[0].type === "kanji" && <KanjiCard card={queue[0]} reveal={reveal} setReveal={setReveal}/>}
                {queue[0].type === "vocab" && <VocabCard card={queue[0]} reveal={reveal} setReveal={setReveal}/>}

                <div className={styles.answerButtons}>
                    <button className={`${reveal ? styles.answerIncorrect : styles.buttonDisabledI}`} onClick={() => {
                            if (!reveal) 
                                return;
                            advance(false)}
                        }>False</button>
                    <button className={`${reveal ? styles.answerCorrect : styles.buttonDisabledC}`} onClick={() => {
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
    const meaning = card.front.meaning.charAt(0).toUpperCase() + card.front.meaning.slice(1);



    return(
        <div className={styles.display}>
     
            <div className={styles.meaningContainer}>
                <p className={styles.displayLabel}>KANJI</p>
                <p className={styles.displayMeaning}>{meaning}</p>
            </div>

            <div className={styles.displayReadings}> 
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>KUN'YOMI</p>
                    <p className={styles.displayValue}>{card.front.kunyomi}</p>
                </div>
    
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>ON'YOMI</p>
                    <p className={styles.displayValue}>{card.front.onyomi}</p>
                </div>
            </div>


            <button type="button" className={styles.writeBoxKanji}
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
        <div className={styles.display}>
                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>MEANING</p>
                    <p className={styles.displayMeaning}>{card.front.eng}</p>
                </div>

                <div className={styles.displayBox}>
                    <p className={styles.displayLabel}>SPELLING</p>
                    <p className={styles.displayValue}>{card.front.hira}</p>
                </div>

            <button type="button" className={styles.writeBoxVocab}
                    onClick={() => setReveal(true)}>
                {reveal
                    ? <span className={styles.writeVocab} style={{ fontSize: `${260 / card.back.length}px` }}>
                {card.back}</span>
                    : <span className={styles.writeHint}>✍︎<br/>Write it<br/>on paper<br/>tap to flip</span>}
            </button>
        </div>
    );
}

function Finish() {
    return(
        <div className={styles.body}>
            <p className={styles.finishedPrompt}>You have finished all your typing cards for today!</p>

            <Link to='/dashboard' className={styles.dashButton}>Back to Dashboard</Link>
        </div>
    );
}
export default Writing

/*
    useEffect(() => {
            loadWriting();
        }, []);

        // Stops error
        useEffect(() => {
            if (writing) setQueue(buildQueue(writing));
        }, [writing]);
*/