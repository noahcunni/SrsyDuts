import { Link } from "react-router";

import styles from './AppNavbar.module.css';

function AppNavbar() {
    return (

        <div className={styles.navbar}>
            <div className={styles.dashContainer}>
                <Link to='/dashboard'>
                    <img className={styles.dashButton} src='https://preview.redd.it/i-drew-lois-griffin-as-l-second-picture-is-with-loiss-colors-v0-fmi3ns9juned1.jpg?width=640&crop=smart&auto=webp&s=ea3516f510b74f5c086cf30082ee6bf00dcb585b' alt='Luis'/>            
                </Link>
            </div>
        
            <div className={styles.studyButtonGroup}>
                <Link to='/study/lesson' className={styles.studyButton}>Lesson</Link>
                <Link to='/study/writing' className={styles.studyButton}>Writing</Link>
                <Link to='/study/typing' className={styles.studyButton}>Typing</Link>
            </div>
            <div className={styles.signOut}>
                <Link>Sign Out</Link>
            </div>
        </div>
    );
}

export default AppNavbar