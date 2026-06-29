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

export async function typingCheck (session, card, userInput) {
    const payload = {
        cardId: card.id,
        direction: card.direction,
        answer: userInput,
    };

    try {
        const response = await fetch('http://localhost:8080/api/srs/typingCheck', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok)
            throw new Error(`Server error: ${response.status} `);

        if (response.ok) {
            const data = await response.json();
            console.log("Success: ", data);
            return data;
        }
    } catch (error) {
        console.error("Error sending typingCheck: ", error);
    }
}

export async function introduce(session, card) {
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
                        cardId: card.id,
                        cardType: card.type
                })
            }
        );

        if (!response.ok) {
            throw new Error(`http status Error: ${response.status}`);
        }
    } catch (error) {
        console.log("Error getting batch, " + error);
    }
}