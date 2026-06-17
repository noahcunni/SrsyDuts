import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabaseClient";

function Dashboard() {
    const navigate = useNavigate();
    const [jwt, setJwt] = useState('');
    const [batch, setBatch] = useState();

    useEffect(() => { 
        const getJwt = async () => {
            const { data: { session } } = await supabase.auth.getSession(); 
            setJwt(session.access_token);
        }
        getJwt();
    }, []);

    useEffect(() => {
        const getBatch = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/getBatch', {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                });
            } catch (error) {
                console.log("Error getting batch, " + error);
                setBatch(null);
            }

            if (response.ok) {
                setBatch(response.batch);
                console.log("Batch recieved!");
            }
        }

        getBatch();
    }, []);

    return <p>Dashboard</p>; 
} 

export default Dashboard;