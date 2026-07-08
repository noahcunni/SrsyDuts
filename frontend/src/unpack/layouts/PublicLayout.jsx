import { Outlet } from 'react-router';
import PublicNavbar from '../navbar/PublicNavbar';
import styles from './PublicLayout.module.css';


function PublicLayout() {
    return(
        <div className={styles.layout}>
            <PublicNavbar />
            <Outlet />
        </div>
    );
}

export default PublicLayout