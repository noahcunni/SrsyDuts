import { useState } from "react";

function buildQueue(cards) {
  const kanjiCards = cards.newKanji.map(card => ({
    type: "kanji",
    meaning: card.meaning,
    onyomi: card.onyomi,
    kunyomi: card.kunyomi,
    back: card.kanji,
  }));

  const vocabCards = cards.newVocab.map(card => ({
    type: "vocab",
    eng: card.english,
    hira: card.hiragana,
    back: card.jpn,
  }));
  return [...kanjiCards, ...vocabCards]
    .sort(() => Math.random() - 0.5);
}


function Writing({ cards, next }) {
    const [queue, setQueue] = useState(() => buildQueue(cards));
    
    function advance(correct) {
        const restOfQueue = queue.slice(1);
        if (correct) {
            setQueue(restOfQueue);
            // INTRODUCE CARD TO DATABASE
        } else {
            setQueue([...restOfQueue, queue[0]]);
        }
    }

    return(
        <div>
            {queue.length !== 0 && queue[0].type === "kanji" && <KanjiCard card={queue[0]}/>}
            {queue.length !== 0 && queue[0].type === "vocab" && <VocabCard card={queue[0]}/>}

            {queue.length !== 0 && <button onClick={() => advance(false)}>False</button>}
            {queue.length !== 0 && <button onClick={() => advance(true)}>True</button>}

            {queue.length === 0 && <button onClick={next}>To review</button>}
        </div>
    );
}   

function KanjiCard({card }) {
    return(
        <div>
            <p>Kunyomi: {card.kunyomi}</p>
            <p>Onyomi: {card.onyomi}</p>
            <p>Meaning: {card.meaning}</p>
            <h1>Kanji: {card.back}</h1>
        </div>
    );
}

function VocabCard({ card }) {
    return(
        <div>
            <p>English: {card.eng}</p>
            <p>Hiragana: {card.hira}</p>
            <h1>JPN: {card.back}</h1>
        </div>
    );
}

export default Writing