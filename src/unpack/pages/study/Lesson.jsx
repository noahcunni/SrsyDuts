import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

function Lesson() {
    const [message, setMessage] = useState();
    useEffect(() => {
        async function getMessage() {
            const { data, error } = await supabase
                .from('Names')
                .select('*')

            if (error) {
                console.error(error)
                return
            }

            setMessage(data[0].text)
        }

        getMessage()
    }, [])

    return (
        <h1>{message}</h1>
    )
}

export default Lesson