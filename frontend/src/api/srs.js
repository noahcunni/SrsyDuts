export async function introduce(session, card) {
    if (!session) { // Check the session
        console.log('Session invalid!');
        return false;}
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
        return response.ok;
    } catch (error) {
        console.log("Error introducing card: " + error);
        return false;
    }
}

export async function writingCorrect (session, cardId, cardType) {
    if (!session) { // Check the session
        console.log('Session invalid!');
        return false;}
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
        return response.ok;
    } catch (error) {
        console.error("Error sending writingCorrect: ", error);
        return false;
    }
}

export async function writingIncorrect (session, cardId, cardType) {
    if (!session) { // Check the session
        console.log('Session invalid!');
        return false;}

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
        return response.ok;
    } catch (error) {
        console.error("Error sending writingIncorrect: ", error);
        return false;
    }
}

export async function typingAnswer(session, card, isCorrect) {
    if (!session) { // Check the session
        console.log('Session invalid!');
        return false;}
    const payload = {
        cardId: card.id,
        direction: card.direction,
        correct: isCorrect
    };

    try {
        const response = await fetch('http://localhost:8080/api/srs/typingAnswer', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending typingAnswer: ", error);
        return false;
    }
}