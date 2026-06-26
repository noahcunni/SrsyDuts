import { useEffect, useState, useReducer } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import { UserDeck } from "../../../../context/CardContext";
import { LessonVocabCard, LessonKanjiCard } from "./LessonCardContainer";
import Intro from "./stages/Intro";
import Quiz from "./stages/Quiz";
import Review from "./stages/Review";
import Writing from "./stages/Writing";
import styles from "./LessonCard.module.css";

// Each lesson should start with
// Intro - Quiz - Typing - Review
function reducer(state, action) {
    if (action.type === "NEXT") {
        switch(state.stage) {
            case "INTRO": return { stage: "QUIZ" }

            case "QUIZ": return { stage: "WRITING" }

            case "WRITING": return { stage: "REVIEW" }

            default: return state;
        }
    }
    else
        throw Error("Unkown Action");  
}

// dispatch({type: NEXT})


function Lesson() {
    const [state, dispatch] = useReducer(reducer, {stage: "INTRO"});
    const { newCards, loadNewCards } = UserDeck();
    const [ jsonObject, setJsonObject ] = useState();
    const [ cardCount, setCardCount ] = useState();

    useEffect(() => {
        loadNewCards();
    }, [])

    useEffect(() => {
        if (newCards) setCardCount(newCards.newKanji.length + newCards.newVocab.length);
    }, [newCards])

    if (!newCards) return <p>Loading new cards...</p>;

    const newKanji = newCards.newKanji;
    const newVocab = newCards.newVocab;

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.headerIcon}>学</h1>

                <div>
                    <h1 className={styles.headerText}>Today's lesson: {cardCount} cards</h1>
                    <h1 className={styles.headerStatus}>{state.stage}</h1>
                </div>
            </div>

            {/*Holds the stage*/}
            <div>
                {state.stage === "INTRO" && <Intro cards={newCards} next={() => dispatch({type: "NEXT"})}/>}
                {state.stage === "QUIZ" && <Quiz cards={newCards} next={() => dispatch({type: "NEXT"})}/>}
                {state.stage === "WRITING" && <Writing cards={newCards} next={() => dispatch({type: "NEXT"})} />}
                {state.stage === "REVIEW" && <Review cards={newCards} next={() => dispatch({type: "NEXT"})}/>} 
            </div>
        </div>
    );
}   

export default Lesson