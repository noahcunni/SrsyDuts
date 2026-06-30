import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import styles from './Typing.module.css';
import { UserDeck } from "../../../../context/CardContext";
import { typingCheck, typingAnswer } from "../../SRS/SRSController";
import { Link, useLocation } from "react-router";


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
    const [ answer, setAnswer ] = useState();

    useEffect(() => {
        loadTyping();
    }, []);
    
    // Stops error
    useEffect(() => {
        if (typing) setQueue(buildQueue(typing));
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
        if (queue[0].direction === "jpn_eng") {
            cardAnswer = queue[0].back.english.toLowerCase();
        }
        else {
            cardAnswer = queue[0].back.hiragana;
        }


        if (cardAnswer === userAnswer) {
            typingAnswer(session, queue[0], true);
            setState("correct");
            console.log("CORRECT ANSWER: " + cardAnswer);
        } else {
            typingAnswer(session, queue[0], false);
            setState("incorrect");
            console.log("INCORRECT ANSWER: " + cardAnswer);
        }
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
        } else {
            // send queue[0] back to database with incorrect endpoint.
            setQueue([...restOfQueue, queue[0]]);
        }
    }

    if (!queue)
            return <p className={styles.body}>loading typing cards!...</p>

    if (queue.length === 0)
        return <Review/>

    return(
        <div className={styles.body}>
            <p>{JSON.stringify(typing)}</p>
            <div className={styles.progress}>
                <div>
                    <p>progress bar goes here...</p>
                </div>
            </div>
        
            <div className={styles.cardContainer}>
                <h1 className={styles.cardType}>Typing</h1>

                {queue.length !== 0 && <Card card={queue[0]} state={state}/>}

                <div className={styles.inputContainer}>
                    <input className={`${styles.input} ${styles[state]}`} 
                    placeholder={queue[0].direction === "jpn_eng" ? "English" : "ひらがな"} 
                    value={answer} autoComplete="off"
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                    />
                    {state === "waiting" && <button className={styles.submitButton} onClick={handleEnter}>Submit →</button>}
                </div>

                {state !== "waiting" && <Review correct={state === "correct"} card={queue[0]} handleEnter={handleEnter} size={queue.length}></Review>}
            </div>

            <div className={styles.buttons}>
                            
            </div>
        </div>
    );  
}

function Card({ card, state }) {  
    if (card.direction === "jpn_eng") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab}>{card.front}</h1>
                <p className={styles.inputPrompt}>What does this word mean?</p>
            </div>
        );
    }  

    if (card.direction === "jpn_hira") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab}>{card.front}</h1>
                <p className={styles.inputPrompt}>What is this words spelling?</p>
            </div>
        );
    }
}

function Review() {
    return(
        <div className={styles.body}>
            <p className={styles.finishedPrompt}>You have finished all your typing cards for today!</p>

            <Link to='/dashboard' className={styles.dashButton}>Back to Dashboard</Link>
        </div>
    );
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