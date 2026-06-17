import { useEffect, useState } from "react"; 

function About() { 
    const [message, setMessage] = useState('Loading about info...'); 

    useEffect(() => { 
        const fetchAboutData = async () => {
            try {
                // Call the PUBLIC path so the bouncer lets it pass without a token
                const response = await fetch("http://localhost:8080/api/hello");
                
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
            <p>AbouT!</p> 
            {/* Displaying the server message on the screen */}
            <p style={{ color: 'gray' }}>{message}</p>
        </div> 
    ); 
} 

export default About;
