import { Outlet } from "react-router";
import AppNavbar from "../navbar/AppNavbar";

function AppLayout() {
    return(
        <div>
            <AppNavbar />
            <Outlet />
        </div>
    );
}

export default AppLayout