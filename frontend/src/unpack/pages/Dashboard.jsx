import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { UserAuth } from "../../context/AuthContext";

function Dashboard() {
    const { session } = UserAuth();
    const [batch, setBatch] = useState();

    useEffect(() => {
        const getBatch = async () => {
            if (!session) {
                console.log('Session invalid!');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/getBatch', {
                    headers: {
                        "Authorization": `Bearer ${session.access_token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("http status Error: ${response.status}");
            }
            const mes = await response.text();
            setBatch(mes);

            } catch (error) {
                console.log("Error getting batch, " + error);
                setBatch(null);
            }
        }

        getBatch();
    }, [session]);

    return <p>{batch}</p>; 
} 

export default Dashboard;