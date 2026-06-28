import { useState } from "react";
import styles from './Quiz.module.css';

function buildQueue(cards) {
  const vocabCardsEng = cards.newVocab.map(card => ({
    type: "vocab->eng",
    front: card.jpn,
    back: card.english,
  }));

  const vocabCardsHira = cards.newVocab.map(card => ({
    type: "vocab->hira",
    front: card.jpn,
    back: card.hiragana,
  }));

  return [...vocabCardsEng, ...vocabCardsHira]
    .sort(() => Math.random() - 0.5);
}

function Quiz({ cards, next }) {
    const [queue, setQueue] = useState(() => buildQueue(cards));
    const [ answer, setAnswer ] = useState("");
    const [ state, setState ] = useState("waiting"); 

    function advance(correct) {
        const restOfQueue = queue.slice(1);
        if (correct) {
            setQueue(restOfQueue);
        } else {
            setQueue([...restOfQueue, queue[0]]);
        }
    }

    function handleEnter() {
        if (state === "waiting") {
            handleSubmit();
        } else {
            handleContinue();
        }
    }

    function handleSubmit() {
        if (queue[0].back.toLowerCase() === answer.trim().toLowerCase()) {
            setState("correct");
            console.log("CORRECT ANSWER: " + answer);
        } else {
            console.log("INCORRECT ANSWER: " + answer);
            setState("incorrect");
        }
    }

    function handleContinue() {
        advance(state === "correct");
        setState("waiting");
        setAnswer("");
    }

    if (queue.length === 0) {
        return(
            <button onClick={() => next()}>All done!</button>
        );
    }

    return(
        <div className={styles.page}>
            <div className={styles.progress}>
                <div>
                    <p>progress bar goes here...</p>
                </div>
            </div>
        
            <div className={styles.cardContainer}>
                <h1 className={styles.cardType}>Quiz</h1>

                {queue.length !== 0 && <Card card={queue[0]} state={state}/>}

                <input className={`${styles.input} ${styles[state]}`} 
                placeholder={queue[0].type === "vocab->eng" ? "English" : "ひらがな"} 
                value={answer} autoComplete="off"
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                />

                {state === "waiting" && <button onClick={handleEnter}>Submit →</button>}

                {state !== "waiting" && <Review correct={state === "correct"} card={queue[0]} handleEnter={handleEnter}></Review>}
            </div>

            <div className={styles.buttons}>
                            
            </div>
        </div>
    );
}

function Card({ card, state }) {  
    if (card.type === "vocab->eng") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab}>{card.front}</h1>
                <p className={styles.inputPrompt}>What does this word mean?</p>
            </div>
        );
    }  

    if (card.type === "vocab->hira") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab}>{card.front}</h1>
                <p className={styles.inputPrompt}>What is this words spelling?</p>
            </div>
        );
    }
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
                    <p className={styles.incorrectPrompt}>✗ Answer: {card.back}</p>
                    <button className={styles.nextButton} onClick={handleEnter}>Next →</button>
                </div>
            </div>
        );
    }
}
export default Quiz