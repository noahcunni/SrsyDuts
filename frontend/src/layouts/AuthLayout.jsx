import { Outlet } from "react-router";
import PublicNavbar from "../components/navbar/PublicNavbar";
import styles from './AuthLayout.module.css';

function AuthLayout() {
    return(
        <div className={styles.layout}>
            <PublicNavbar />
            <Outlet />
        </div>
    );
}

export default AuthLayout