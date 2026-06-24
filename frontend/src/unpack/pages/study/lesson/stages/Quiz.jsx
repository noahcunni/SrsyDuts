import { useState } from "react";

function buildQueue(cards) {
  const kanjiCards = cards.newKanji.map(card => ({
    type: "kanji->eng",
    front: card.kanji,
    back: card.meaning,
  }));

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

  return [...kanjiCards, ...vocabCardsEng, ...vocabCardsHira]
    .sort(() => Math.random() - 0.5);
}

function Quiz({ cards, next }) {
    const [queue, setQueue] = useState(() => buildQueue(cards));

    function next(correct) {
        const restOfQueue = queue.slice(1);
        if (correct) {
            setQueue(restOfQueue);
        } else {
            setQueue([...restOfQueue, queue[0]]);
        }
    }

    return(
        <p>
            {queue.length !== 0 && <Card card={queue[0]} next={next}/>}
            {queue.length === 0 && <button onClick={() => next()}>All done!</button>}
        </p>
    );
}

function Card({ card, next }) {
    return(
        <div>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button onClick={() => next(false)}>False</button>
            <button onClick={() => next(true)}>True</button>
        </div>
    );
}
export default Quiz