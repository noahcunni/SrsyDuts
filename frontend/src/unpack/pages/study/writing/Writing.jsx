import { useEffect, useState } from "react"; 
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import { UserDeck } from "../../../../context/CardContext";

function buildQueue(cards) {
  const kanjiCards = cards.kanji.map(card => ({
    type: "kanji",
    front: {
        meaning: card.meaning,
        kunyomi: card.kunyomi,
        onyomi: card.onyomi
    },
    back: card.kanji,
  }));

  const vocabCards = cards.vocab.map(card => ({
    type: "vocab",
    front: {
        english: card.english,
        hiragana: card.hiragana
    },
    back: card.jpn,
  }));

  return [...kanjiCards, ...vocabCards]
    .sort(() => Math.random() - 0.5);
}

function Writing() { 
    const [message, setMessage] = useState('Loading writing info...'); 
    const [ cards, setCards ] = useState();
    const { session } = UserAuth();
    const { writing, loadWriting } = UserDeck();
    const [queue, setQueue] = useState();
    const [ flip, setFlip ] = useState(false);
    
        function advance(correct) {
            setFlip(false);
            const restOfQueue = queue.slice(1);
            if (correct) {
                // send queue[0] back to database with correct endpoint.
                setQueue(restOfQueue);
            } else {
                // send queue[0] back to database with incorrect endpoint.
                setQueue([...restOfQueue, queue[0]]);
            }
        }
    
        useEffect(() => {
            loadWriting();
        }, []);

        useEffect(() => {
            if (writing) setQueue(buildQueue(writing));
        }, [writing]);



    if (!queue)
        return <p>loading writing cards...</p>

    return( 
        <div> 
            <p>Writing!</p> 
            {/* Displaying the server message on the screen */}
            <p style={{ color: 'gray' }}>{JSON.stringify(writing)}</p>
            {queue.length !== 0 && <Front card={queue[0]} setFlip={setFlip} flip={flip}/>}
            {queue.length !== 0 && flip === true && <Back card={queue[0]} advance={advance}/>} 

            {queue.length === 0 && <EndScreen/>}
        </div> 
    ); 
} 

function Front({card, setFlip, flip}) {
    return(
        <div>
            {card.type === "kanji" && <Kanji card={card}/>}
            {card.type === "vocab" && <Vocab card={card}/>}

            {flip === false && <button onClick={() => setFlip(true)}>Flip</button>}
        </div>
    );
}

function Back({card, advance}) {
    return(
        <div>   
            <p>{card.back}</p>
            <button onClick={() => advance(false)}>False</button>
            <button onClick={() => advance(true)}>True</button>
        </div>
    );
}

function Kanji({card}) {
    return(
        <div>
            <p>{card.front.meaning}</p>
            <p>{card.front.kunyomi}</p>
            <p>{card.front.onyomi}</p>
        </div>
    );
}

function Vocab({card}) {
    return (
        <div>
            <p>{card.front.english}</p>
            <p>{card.front.hiragana}</p>
        </div>
    );
}

function EndScreen() {
    return(
        <div>
            <p>You have finished all your writing cards!</p>
        </div>
    );
}

export default Writing