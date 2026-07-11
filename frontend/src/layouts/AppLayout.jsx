import { Outlet } from "react-router";
import AppNavbar from "../components/navbar/AppNavbar";
import styles from './AppLayout.module.css';

function AppLayout() {
    return(
        <div className={styles.layout}>
            <AppNavbar />
            <Outlet />
        </div>
    );
}

export default AppLayout