import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { UserAuth } from "../../../context/AuthContext";
import { UserDeck } from "../../../context/CardContext";

// call the cards/newCards or something.
    // Cards are loaded everytime page is loaded. 

    // Introduce each cards with all information once, then 
    // throw it into a testing pile. 

    // The testing section is the only one a user can cheat in, because all information is availbale

    // So how do we deal with writing and typing vocab, writing first?

    // It also needs to be limited to # of cards a day.
function Lesson() {
    const { newCards, loadNewCards } = UserDeck();
    const [ jsonObject, setJsonObject ] = useState();

    useEffect(() => {
        loadNewCards();
        setJsonObject(newCards);
    }, [newCards])

    if (!jsonObject) return <p>Loading new cards...</p>;

    return(
        <p>{JSON.stringify(jsonObject)}</p>
    );
}   

export default Lesson