import { Link } from 'react-router';
import styles from './Landing.module.css';
import { useState } from 'react';
import { convertRomanjiToHiragana } from '../../lib/Converter';
import { IconRepeat, IconKeyboard, IconPencil } from '@tabler/icons-react';

function Landing() {
    

    return(
        <div className={styles.page}>
            <div className={styles.contentBox}>
                <div className={styles.textContentBox}>
                    <p className={styles.subHeader}>Interactive Spaced Repetition</p>

                    <h1 className={styles.header}>Learn Japanese in an order that sticks</h1>
                    <p className={styles.paragraph}>Kanji first, then the words built from them. Every card is 
                        scheduled the moment you're about to forget it. 
                        Learn to read on screen and write on paper.</p>

                    <div className={styles.buttonGroup}>
                        <Link className={styles.signUpButton} to='/signup'>Start learning for free</Link>
                        <Link className={styles.demoButton} to='/signin'>Sign in</Link>
                    </div>
                </div>

                <CardDemo/>
            </div>

            <div className={styles.explainContainer}>
                <div className={styles.explainBox}>
                    <IconRepeat size={40} color="#FF5D8F" stroke={1.75} />
                    <p className={styles.contentHeader}>Roots before words</p>
                    <p className={styles.contentParagraph}>
                        Vocabulary unlocks only after you know the 
                        kanji inside it.</p>
                </div>
                <div className={styles.explainBox}>
                    <IconKeyboard size={40} color="#9D7BFF" stroke={1.75} />
                    <p className={styles.contentHeader}>Learn to type in kana</p>
                    <p className={styles.contentParagraph}>
                        Answers convert to 
                        hiragana as you type - no Japanese keyboard needed.</p>
                </div>
                <div className={styles.explainBox}>
                    <IconPencil size={40} color="#8FE143" stroke={1.75} />
                    <p className={styles.contentHeader}>Write it by hand</p>
                    <p className={styles.contentParagraph}>
                        A dedicated writing stage, because recognizing
                         isn't reproducing.</p>
                </div>
            </div>


            <div>

            </div>
        </div>
    );
}

function CardDemo() {
    const [answer, setAnswer ] = useState();
    const correctAnswer = 'ひと';

    return(
        <div className={styles.cardDemo}>
            <p className={styles.demoPrompt}>Try it out here</p>
            <p className={styles.demoKanji}>人</p>
            <p className={styles.kanjiPrompt}>What is this words spelling?</p>

            <input className={`${styles.demoInput} ${correctAnswer === answer ? styles.demoInputCorrect : ""}`}
                value={answer}
                placeHolder='type: hito'
                onChange={(e) => setAnswer(convertRomanjiToHiragana(e.target.value))}/>

                {correctAnswer !== answer && <p className={styles.romanjiPrompt}>romanji converts as you type</p>}
                {correctAnswer === answer && <p className={styles.correctPrompt}>✓ Correct - ひと, Person</p>}
        </div>
    );
}
export default Landing