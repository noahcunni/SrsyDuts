import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { UserAuth } from "../../context/AuthContext";
import { UserDeck } from "../../context/CardContext";

function Dashboard() {
    const { summary, loadSummary } = UserDeck();
    const { session } = UserAuth();

    useEffect(() => {
      loadSummary();  
    }, [loadSummary]);

    return <p>{JSON.stringify(summary)}</p>; 
}

export default Dashboard;