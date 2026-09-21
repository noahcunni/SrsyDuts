import { Navigate, Outlet } from "react-router";
import { UserAuth } from "./context/AuthContext"

/**
 * This class checks for one thing. Does the user have a session with supabase?
 * If not, send them back to the landing page. Stops the user from trying 
 * to use endpoints they need a JWT for. 
 * 
 * @returns <Outlet /> - This just says "insert content here"
 */
function ProtectedRoute() {
    const { session } = UserAuth(); // grab user session info. 

    // If the session is loading, print a simple loading...
    if (session === undefined) { 
            return <div>Loading...</div>
    } 

    // If the session does not exist anymore, send the user back to landing page.
    if (session === null) {
        return <Navigate to='/' replace />
    }
    
    // Placeholder for children elements.
    return <Outlet />
}

export default ProtectedRoute