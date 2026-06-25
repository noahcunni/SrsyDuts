import { useEffect, useState } from "react"; 
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import { UserDeck } from "../../../../context/CardContext";
import { writingCorrect, writingIncorrect } from '../../SRS/SRSController.jsx';
import styles from './Writing.module.css';

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
        english: card.english,
        hiragana: card.hiragana
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
    const [ flip, setFlip ] = useState(false);

            
        function advance(correct) {
            setFlip(false);
            const restOfQueue = queue.slice(1);
            if (correct) {
                // send queue[0] back to database with correct endpoint.
                setQueue(restOfQueue);
            } else {
                // send queue[0] back to database with incorrect endpoint.
                setQueue([...restOfQueue, queue[0]]);
            }
        }
    
        useEffect(() => {
            loadWriting();
        }, []);

        // Stops error
        useEffect(() => {
            if (writing) setQueue(buildQueue(writing));
        }, [writing]);



    if (!queue)
        return <p>loading writing cards...</p>

    return( 
        <div className={styles.page}> 
            <div className={styles.header}>
                <h1 className={styles.icon}>書</h1>
            </div>

            <div className={styles.body}>
                {queue.length !== 0 && <Front card={queue[0]} setFlip={setFlip} flip={flip}/>}
                {queue.length !== 0 && flip === true && <Back card={queue[0]} advance={advance} writingCorrect={writingCorrect} writingIncorrect={writingIncorrect} session={session}/>} 
                {queue.length === 0 && <EndScreen/>}
            </div>
        </div> 
    ); 
} 

function Front({card, setFlip, flip}) {
    return(
        <div className={styles.frontContainer}>
            {card.type === "kanji" && <Kanji card={card}/>}
            {card.type === "vocab" && <Vocab card={card}/>}

            {flip === false && <button className={styles.flipButton} onClick={() => setFlip(true)}>Flip</button>}
        </div>
    );
}

function Kanji({card}) {
    return(
        <div className={styles.kanjiFront}>
            <p>{card.front.meaning}</p>
            <p>Kunyomi</p>
            <p>{card.front.kunyomi}</p>
            <p>Onyomi</p>
            <p>{card.front.onyomi}</p>
        </div>
    );
}

function Vocab({card}) {
    return (
        <div className={styles.vocabFront}>
            <p>{card.front.english}</p>
            <p>{card.front.hiragana}</p>
        </div>
    );
}

// Displays answer: kanji or vocab + buttons
function Back({card, advance, writingCorrect, writingIncorrect, session}) {
    return(
        <div className={styles.back}>   
            <h1 className={styles.answer}>{card.back}</h1>
            <div className={styles.answerButtons}>
                <button className={styles.falseButton} onClick={() => {advance(false); writingIncorrect(session, card.id, card.type)}}>False</button>
                <button className={styles.trueButton} onClick={() => {advance(true); writingCorrect(session, card.id, card.type)}}>True</button>
            </div>
        </div>
    );
}

function EndScreen() {
    return(
        <div>
            <p>You have finished all your writing cards!</p>
        </div>
    );
}

export default Writing