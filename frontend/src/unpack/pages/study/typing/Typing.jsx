import { useEffect, useState } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import styles from './Typing.module.css';
import { UserDeck } from "../../../../context/CardContext";
import { typingAnswer } from "../../SRS/SRSController";
import { Link } from "react-router";

import { convertRomanjiToHiragana } from "../../SRS/converter";


function buildQueue(cards) {
  const typingVocab = cards.vocab.map(card => ({
    id: card.id,
    direction: card.direction,
    front: card.jpn,    
    back: {
        english: card.english,
        hiragana: card.hiragana
    }
  }));

  return [...typingVocab]
    .sort(() => Math.random() - 0.5);
}

function Typing() {
    const { session } = UserAuth();
    const { typing, loadTyping } = UserDeck();
    const [ queue, setQueue ] = useState();
    const [ state, setState ] = useState("waiting");
    const [ answer, setAnswer ] = useState("");
    const [ totalNumber, setTotalNumber ] = useState(0);
    const [saveFailed, setSaveFailed] = useState(false);

    useEffect(() => {
        loadTyping();
    }, []);
    
    // Stops error
    useEffect(() => {
        
        if (typing) {
            const q = buildQueue(typing);
            setQueue(q);
            setTotalNumber(q.length);
        }
    }, [typing]);

    function handleEnter() {
        if (state === "waiting") {
            handleSubmit();
        } else {
            handleContinue();
        }
    }

    async function handleSubmit() {
        // Grading is done on client-side for now...
        const userAnswer = answer.trim().toLowerCase();
        let cardAnswer = undefined;


        // Grab the answer to grade based on direction
        if (queue[0].direction === "jpn_eng") {
            cardAnswer = queue[0].back.english.toLowerCase();
        }
        else {
            cardAnswer = queue[0].back.hiragana;
        }
    
        // Grade answer
        const isCorrect = cardAnswer === userAnswer;
        setState(isCorrect ? "correct" : "incorrect");

        const saved = await typingAnswer(session, queue[0], isCorrect);
        if (!saved) setSaveFailed(true);
    }

    function handleContinue() {
        advance(state === "correct");
        setState("waiting");
        setAnswer("");
    }

    function advance(correct) {
        const restOfQueue = queue.slice(1);
        if (correct) {
            // send queue[0] back to database with correct endpoint.
            setQueue(restOfQueue);
            setTotalNumber(totalNumber - 1);
        } else {
            // send queue[0] back to database with incorrect endpoint.
            setQueue([...restOfQueue, queue[0]]);
        }
    }

    if (!queue)
            return <p className={styles.body}>loading typing cards!...</p>

    if (queue.length === 0)
        return <Finished/>

    return(
        <div className={styles.body}>
            <p className={styles.cardCount}>There are {totalNumber} cards left</p>
            {saveFailed && <p className={styles.saveWarning}>A review failed to save — unsaved cards will reappear next session.</p>}
            <div className={styles.cardContainer}>
                <h1 className={styles.cardType}>Typing</h1>

                {queue.length !== 0 && <Card card={queue[0]} state={state}/>}

                <div className={styles.inputContainer}>
                    <input className={`${styles.input} ${styles[state]}`} 
                    placeholder={queue[0].direction === "jpn_eng" ? "English here..." : "ここに入力..."} 
                    value={answer} autoComplete="off"
                    onChange={(e) => {
                        const raw = e.target.value;
                        setAnswer(queue[0].direction === "jpn_hira"
                        ? convertRomanjiToHiragana(raw) : raw);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                    />
                    {state === "waiting" && <button className={styles.submitButton} onClick={handleEnter}>Submit →</button>}
                </div>

                {state !== "waiting" && <Review correct={state === "correct"} card={queue[0]} handleEnter={handleEnter}></Review>}
            </div>

        </div>
    );  
}

function Card({ card, state }) {  
    if (card.direction === "jpn_eng") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab} style={{ fontSize: `${260 / card.front.length}px`}}>{card.front}</h1>
                <p className={styles.inputPrompt}>What does this word mean?</p>
                <p className={styles.inputType}>ENGLISH</p>
            </div>
        );
    }  

    if (card.direction === "jpn_hira") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab}  style={{ fontSize: `${260 / card.front.length}px`}}>{card.front}</h1>
                <p className={styles.inputPrompt}>What is this words spelling?</p>
                <p className={styles.inputType}>ひらがな</p>
            </div>
        );
    }
}

function Finished() {
    return(
        <div className={styles.body}>
            <p className={styles.finishedPrompt}>You have finished all your typing cards for today!</p>

            <Link to='/dashboard' className={styles.dashButton}>Back to Dashboard</Link>
        </div>
    );
}

function Review({correct, card, handleEnter}) {
    if (correct) {
        return(
            <div>
                <div className={styles.divider}></div>

                <div className={styles.review}>
                    <p className={styles.correctPrompt}>✓ Correct!</p>
                    <button className={styles.nextButton} onClick={handleEnter}>Next →</button>
                </div>
            </div>
        );
    } else {
        return(
            <div>
                <div className={styles.divider}></div>
                <div className={styles.review}>
                    {card.direction === "jpn_eng" && <p className={styles.incorrectPrompt}>✗ Answer: {card.back.english}</p>}
                    {card.direction === "jpn_hira" && <p className={styles.incorrectPrompt}>✗ Answer: {card.back.hiragana}</p>}
                    <button className={styles.nextButton} onClick={handleEnter}>Next →</button>
                </div>
            </div>
        );
    }
}

export default Typing

/*
In case if you want to go back to server-side grading
    async function handleSubmit() {
        // Grading logic shouldnt be done client-side, BUT FOR NOW ITS TOO SLOW!
        // Grade client-side for now until you find a solution?

        // Send user answer to the database and let it return a true or false
        const userAnswer = answer.trim().toLowerCase();
        const result = await typingCheck(session, queue[0], userAnswer);
        console.log(JSON.stringify(result));

        if (result.correct) {
            setState("correct");
            console.log("CORRECT ANSWER: " + cardAnswer);
        } else {
            setState("incorrect");
            console.log("INCORRECT ANSWER: " + cardAnswer);
        }
    }
*/