import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

function Lesson() {
    const [message, setMessage] = useState();
    const [answer, setAnswer] = useState('');

    const checkAnswer = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.rpc('hello_world');
        console.log('result:', data, error);
    }


    useEffect(() => {
        async function getMessage() {
            const { data, error } = await supabase
                .from('kanji')
                .select('*')

            if (error) {
                console.error(error)
                return
            }

            setMessage(data[0].kanji)
        }

        getMessage()
    }, [])

    return (
        <form onSubmit={checkAnswer} >
            <h1>{message}</h1>
            <input  
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Answer' 
                type="text"/>
            <button type='submit'>submit</button>
        </form>


    )
}

export default Lesson