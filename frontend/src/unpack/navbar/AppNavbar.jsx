import { Link, useLocation } from "react-router";

import styles from './AppNavbar.module.css';

function AppNavbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path; // evals current path

    return (

        <div className={styles.navbar}>
            <div className={styles.dashContainer}>
                <Link to='/dashboard'>家</Link>
            </div>
        
            <div className={styles.studyButtonGroup}>
                <Link to='/study/lesson' className={`${styles.studyButton} ${isActive('/study/lesson') ? styles.activeButton : ''}`}>Lesson</Link>
                <Link to='/study/writing' className={`${styles.studyButton} ${isActive('/study/writing') ? styles.activeButton : ''}`}>Writing</Link>
                <Link to='/study/typing' className={`${styles.studyButton} ${isActive('/study/typing') ? styles.activeButton : ''}`}>Typing</Link>
                <Link to='/study/create' className={`${styles.studyButton} ${isActive('/study/create') ? styles.activeButton : ''}`}>Create</Link>
            </div>
            <div>
                <Link className={styles.signOut}>Sign Out</Link>
            </div>
        </div>
    );
}

export default AppNavbar