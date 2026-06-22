import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { UserAuth } from "../../../context/AuthContext";

function Typing() {
    const { session } = UserAuth();
    const [batch, setBatch] = useState();

    useEffect(() => {
        const getBatch = async () => {
            if (!session) { // Check the session
                console.log('Session invalid!');
                return;}
            try { // Go for it
                const response = await fetch('http://localhost:8080/api/introduce', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cardId: 1,
                        cardType: 'kanji'
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`http status Error: ${response.status}`);
            }
            const mes = await response.text();
            setBatch(mes);

            } catch (error) {
                console.log("Error getting batch, " + error);
                setBatch(null);
            }
        }

        getBatch();
    }, [session]);

    return <p>{batch}</p>; 
}

export default Typing