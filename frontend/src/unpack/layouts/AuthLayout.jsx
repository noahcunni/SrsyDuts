import { Outlet } from "react-router";
import PublicNavbar from "../navbar/PublicNavbar";

function AuthLayout() {
    return(
        <div>
            <PublicNavbar />
            <Outlet />
        </div>
    );
}

export default AuthLayout