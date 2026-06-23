import { createContext, useContext, useState } from "react";
import { UserAuth } from "./AuthContext";

const CardContext = createContext();

export const CardContextProvider = ({ children }) => {
    const { session } = UserAuth();

    const [ summary, setSummary ] = useState();
    const [ writing, setWriting ] = useState();
    const [ typing, setTyping ] = useState();
    const [ newCards, setNewCards ] = useState();

    // Blocks fast requests
    const [ loading, setLoading ] = useState({
        summary: false,
        writing: false,
        typing: false,
        newCards: false
    });

    // PLAN TO BLOCK REPEATED REQUESTS
    const [ lastFetchedAt, setLastFetchedAt ] = useState({
        summary: null,
        writing: null,
        typing: null,
        newCards: null
    });

    const loadThreshold = 1_000;


    // ANY LOAD METHOD NEEDS TO BE GAURDED FROM MULTIPLE REQUESTS
    const loadSummary = async () => {
        // Check if a minute has passed
        if (lastFetchedAt.summary && (Date.now() - lastFetchedAt.summary <= loadThreshold))
            return;


        let isAlreadyLoading = false;
    
        setLoading((prev) => {
            if (prev.summary) {
            isAlreadyLoading = true;
            return prev;
        }
            return { ...prev, summary: true };
        });

        if (isAlreadyLoading) return;

        try {
            const response = await fetch('http://localhost:8080/api/cards/summary', {
                    headers: {
                        "Authorization": `Bearer ${session.access_token}`
                    }
            });
            const data = await response.json();
            setSummary(data);
            setLastFetchedAt(prev => ({ ...prev, summary: Date.now() }));
            console.log("SUCCESSFULLY LOADED SUMMARY")
        } catch (e) {
            console.log("Failed to load summary" + e);
        } finally {
            setLoading(prev => ({...prev, summary:false}));
        }
    };

    const loadWriting = async () => {
        // Query for writing
        let isAlreadyLoading = false;
    
        setLoading((prev) => {
            if (prev.writing) {
            isAlreadyLoading = true;
            return prev;
        }
            return { ...prev, writing: true };
        });

        if (isAlreadyLoading) return;

        try {
            const response = await fetch("/api/cards/writing");
            const data = await response.json();
            setWriting(data);
            setLastFetchedAt(prev => ({ ...prev, writing: Date.now() }));
        } catch (e) {
            console.log("Failed to load writing" + e);
        } finally {
            setLoading(prev => ({...prev, writing:false}));
        }
    };

    const loadTyping = (() => {
        // query for typing
    });

    const loadNewCards = async () => {
        // query for new cards
        // Check if a minute has passed
        if (lastFetchedAt.newCards && (Date.now() - lastFetchedAt.newCards <= loadThreshold))
            return;


        let isAlreadyLoading = false;
    
        setLoading((prev) => {
            if (prev.newCards) {
            isAlreadyLoading = true;
            return prev;
        }
            return { ...prev, newCards: true };
        });

        if (isAlreadyLoading) return;

        try {
            const response = await fetch('http://localhost:8080/api/cards/newCards', {
                    headers: {
                        "Authorization": `Bearer ${session.access_token}`
                    }
            });
            const data = await response.json();
            setNewCards(data);
            setLastFetchedAt(prev => ({ ...prev, newCards: Date.now() }));
            console.log("SUCCESSFULLY LOADED NEW CARDS")
        } catch (e) {
            console.log("Failed to load summary" + e);
        } finally {
            setLoading(prev => ({...prev, newCards:false}));
        }
    };

    return (
        <CardContext.Provider value={{ summary, loadSummary, writing, loadWriting,
         typing, loadTyping, newCards, loadNewCards }}>
            {children}
        </CardContext.Provider>
    );
};


export const UserDeck = () => {
    return useContext(CardContext);
}
