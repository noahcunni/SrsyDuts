import styles from './LessonCard.module.css'

export function LessonKanjiCard({ card }) {
    // funtime  
    return(
        <div className={styles.kanjiCard}>
            <p>{card.kanji}</p>
            <p>{card.kunyomi}</p>
            <p>{card.onyomi}</p>
            <p>{card.meaning}</p>
        </div>
    );
}

export function LessonVocabCard({ card }) {
    return(
        <div className={styles.vocabCard}>
            <p>{card.jpn}</p>
            <p>{card.hiragana}</p>
            <p>{card.english}</p>
        </div>
    );
}
