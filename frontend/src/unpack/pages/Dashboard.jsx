import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { UserDeck } from "../../context/CardContext";

function Dashboard() {
    const { summary, loadSummary } = UserDeck();
    const { session } = UserAuth();

    const [summaryObject, setSummaryObject] = useState(null);

    useEffect(() => {
        loadSummary();
        if (summary) { 
        try {
            setSummaryObject(summary);
        } catch (error) {
            console.error("Malformed summary JSON string:", error);
        }
    }
    }, [loadSummary, summary]);


    if (!summaryObject) {
        return <p>Loading your summary...</p>
    }

    return (
        <div>
            <p>{JSON.stringify(summary)}</p>; 
            <h1>You have {summary.newKanji + summary.newVocab} new cards to study!</h1>
            <h1>Too bad you have {summaryObject.dueKanji} cards to study right now though</h1>
        </div>
    );
}

export default Dashboard;