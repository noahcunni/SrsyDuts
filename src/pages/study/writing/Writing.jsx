import React from 'react'
import { useState } from 'react'
import styles from './Writing.module.css'
import { getCard, update } from '../database/database.jsx'

let card = useState ? getCard() : null;

function Writing() { 
    if (card === null) {
        return(
            <div>
                <h1>
                    You have finished this deck! 
                </h1>
            </div>
        );
    }
    const [showAnswer, setShowAnswer] = useState(false);    
    
    return (
        <div className={styles.div}>
            <div>   
                <h1>{card.english}</h1>
                <h1>{card.hiragana}</h1>
                {showAnswer && <h2>{card.kanji}</h2>}
            
                {showAnswer === false && <button onClick={() => 
                setShowAnswer(true)}>Flip</button>}
            
                {showAnswer && <button onClick={() => { // RIGHT
                setShowAnswer(false);
                update(true);
                card = getCard();
                }}>Right</button>}

                {showAnswer && <button onClick={() => { // WRONG
                setShowAnswer(false);
                update(false);
                card = getCard();
                }}>Wrong</button>}
            </div>
        </div>
    );
}


export default Writing