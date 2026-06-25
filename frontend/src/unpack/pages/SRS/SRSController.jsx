import { UserAuth } from "../../../context/AuthContext";

export async function writingCorrect (session, cardId, cardType) {
    const payLoad = JSON.stringify({cardId, cardType});
    try {
        const response = await fetch('http://localhost:8080/api/srs/writingCorrect', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${session.access_token}`,
                'Content-Type': 'application/json', // Critical for Spring Boot to identify JSON
            },
            body: payLoad, // Converts JSX state object into a JSON string
        });

        if (response.ok) {
            const data = await response.text();
            console.log("Success:", data);
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

export async function writingIncorrect (session, cardId, cardType) {
    const payLoad = JSON.stringify({ cardId, cardType });

    try {
        const response = await fetch('http://localhost:8080/api/srs/writingIncorrect', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${session.access_token}`,
                'Content-Type': 'application/json', // Critical for Spring Boot to identify JSON
            },
            body: payLoad, // Converts JSX state object into a JSON string
        });

        if (response.ok) {
            const data = await response.text();
            console.log("Success:", data);
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}