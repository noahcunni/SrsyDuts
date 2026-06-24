import { useEffect, useState, useReducer } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import { UserDeck } from "../../../../context/CardContext";
import { LessonVocabCard, LessonKanjiCard } from "../LessonCardContainer";
import Intro from "./stages/Intro";
import Quiz from "./stages/Quiz";
import Review from "./stages/Review";
import Writing from "./stages/Writing";

// Each lesson should start with
// Intro - Quiz - Typing - Review
function reducer(state, action) {
    if (action.type === "NEXT")
        switch(state.stage) {
            case "INTRO": return { stage: "QUIZ" }

            case "QUIZ": return { stage: "WRITING" }

            case "WRITING": return { stage: "REVIEW" }

            case "REVIEW": return null

            default: return state;
        }
    else
        throw Error("Unkown Action");  
}

// dispatch({type: NEXT})


function Lesson() {
    const [state, dispatch] = useReducer(reducer, {stage: "INTRO"});
    const { newCards, loadNewCards } = UserDeck();
    const [ jsonObject, setJsonObject ] = useState();

    useEffect(() => {
        loadNewCards();
        setJsonObject(newCards);
    }, [newCards])

    if (!jsonObject) return <p>Loading new cards...</p>;

    const newKanji = newCards.newKanji;
    const newVocab = newCards.newVocab;

    return(
        <div>
            <p>{JSON.stringify(jsonObject)}</p>
            {state.stage === "INTRO" && <Intro cards={newCards}/>}
            {state.stage === "QUIZ" && <Quiz cards={newCards}/>}
            {state.stage === "WRITING" && <Writing cards={newCards} />}
            {state.stage === "REVIEW" && <Review cards={newCards}/>} 
            

            <button onClick={() => dispatch({type: "NEXT"})}>Next</button>
        </div>
    );
}   

export default Lesson