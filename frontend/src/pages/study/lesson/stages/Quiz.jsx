import { useState } from "react";
import styles from './Quiz.module.css';
import { convertRomanjiToHiragana } from "../../../../lib/Converter";

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
        if (queue.length === 1 && state === "correct")
            next();

        advance(state === "correct");
        setState("waiting");
        setAnswer("");
    }

    if (state === "waiting" && queue.length === 0) {
        return(
            <button onClick={() => next()}>On to writting session</button>
        );
    }

    return(
        <div className={styles.page}>
            <div className={styles.cardContainer}>
                <h1 className={styles.cardType}>Quiz</h1>

                {queue.length !== 0 && <Card card={queue[0]} state={state}/>}

                <div className={styles.inputContainer}>
                    <input className={`${styles.input} ${styles[state]}`} 
                    placeholder={queue[0].type === "vocab->eng" ? "English here..." : "ここに入力..."} 
                    value={answer} autoComplete="off"
                    onChange={(e) => {
                        const raw = e.target.value;
                        setAnswer(queue[0].type === "vocab->hira"
                        ? convertRomanjiToHiragana(raw) : raw);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                    />
                    {state === "waiting" && <button className={styles.submitButton} onClick={handleEnter}>Submit →</button>}
                </div>

                {state !== "waiting" && <Review correct={state === "correct"} card={queue[0]} handleEnter={handleEnter} size={queue.length} next={next}></Review>}
            </div>
        </div>
    );
}

function Card({ card, state }) {  
    if (card.type === "vocab->eng") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab} style={{ fontSize: `${260 / card.front.length}px` }}>{card.front}</h1>
                <p className={styles.inputPrompt}>What does this word mean?</p>
                <p className={styles.typePrompt}>ENGLISH</p>
            </div>
        );
    }  

    if (card.type === "vocab->hira") {
        return(
            <div className={styles.card}>
                <h1 className={styles.vocab} style={{ fontSize: `${260 / card.front.length}px` }}>{card.front}</h1>
                <p className={styles.inputPrompt}>What is this words spelling?</p>
                <p className={styles.typePrompt}>ひらがな</p>
            </div>
        );
    }
}

function Review({correct, card, handleEnter, size, next}) {
    if (correct) {
        return(
            <div>
                <div className={styles.divider}></div>

                <div className={styles.review}>
                    <p className={styles.correctPrompt}>✓ Correct!</p>

                    {size !== 1 && <button className={styles.nextButton} onClick={handleEnter}>Next →</button>}
                    {size === 1 && <button className={styles.nextButton} onClick={next}>Writing →</button>} 
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