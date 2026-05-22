import React from 'react'
import { useState } from 'react'
import styles from './Writing.module.css'
import { getCard, update } from '../database/database.jsx'

function Writing() { 
    const [showAnswer, setShowAnswer] = useState(false);    
    let card = useState ? getCard() : null;

    return (
        <div className={styles.div}>
            <h1>{card.english}</h1>
            <h1>{card.hiragana}</h1>
            {showAnswer && <h2>{card.kanji}</h2>}
            
            {showAnswer === false && <button onClick={() => 
                setShowAnswer(true)}>Flip</button>}
            
            {showAnswer && <button onClick={() => { // RIGHT
                setShowAnswer(false);
                update(card);
            }}>Right</button>}

            {showAnswer && <button onClick={() => { // WRONG
                setShowAnswer(false);
                card = getCard();
            }}>Wrong</button>}
        </div>
    );
}

export default Writing