import { useEffect, useState } from "react"; 
import { supabase } from "../../../lib/supabaseClient";
import { UserAuth } from "../../../context/AuthContext";

function Writing() { 
    const [message, setMessage] = useState('Loading about info...'); 
    const { session } = UserAuth();
    
    useEffect(() => { 
        const fetchAboutData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
                
                if (!session) {
                    setMessage("Not logged in");
                    return;
                }

                const jwtToken = session.access_token;
            try {
                const response = await fetch("http://localhost:8080/api/hello", {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
            });
                
                if (response.ok) {
                    const data = await response.text(); 
                    setMessage(data); // Updates the state with Java's text response
                } else {
                    setMessage(`Failed to load: Status ${response.status}`);
                }
            } catch (error) {
                console.error("Connection error:", error);
                setMessage("Could not connect to the server.");
            }
        };

        fetchAboutData(); 
    }, []); 

    return( 
        <div> 
            <p>Writing!</p> 
            {/* Displaying the server message on the screen */}
            <p style={{ color: 'gray' }}>{message}</p>
        </div> 
    ); 
} 

export default Writing