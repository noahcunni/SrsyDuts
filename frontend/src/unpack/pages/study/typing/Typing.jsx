import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";

function Typing() {
    const { session } = UserAuth();
    const [batch, setBatch] = useState();

    useEffect(() => {
    }, [session]);

    return <p>Typing on my uuh.</p>; 
}

export default Typing