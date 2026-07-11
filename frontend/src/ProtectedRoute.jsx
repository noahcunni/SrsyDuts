import { Navigate, Outlet, useNavigate } from "react-router";
import { UserAuth } from "./context/AuthContext"

function ProtectedRoute() {
    const auth = UserAuth();
    const navigate = useNavigate();

    if (!auth.session) {
        return(
            <Navigate to='/'/>
        );
    } else
        return (
            <Outlet />
        ); 
}

export default ProtectedRoute