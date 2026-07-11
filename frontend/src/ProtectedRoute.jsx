import { Navigate, Outlet } from "react-router";
import { UserAuth } from "./context/AuthContext"

function ProtectedRoute() {
    const { session } = UserAuth();

    if (session === undefined) {
            return <div>Loading...</div>
    } 

    if (session === null) {
        return <Navigate to='/' replace />
    }
    
    return <Outlet />
}

export default ProtectedRoute