import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { UserAuth } from "../../../../context/AuthContext";
import styles from './Typing.module.css';

function Typing() {
    const { session } = UserAuth();
    const [batch, setBatch] = useState();

    useEffect(() => {
    }, [session]);

    return <p className={styles.body}>Typing on my uuh.</p>; 
}

export default Typing