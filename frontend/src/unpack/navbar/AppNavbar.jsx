import { Link } from "react-router";

import styles from './AppNavbar.module.css';

function AppNavbar() {
    return (

        <div className={styles.navbar}>
            <div className={styles.dashContainer}>
                <Link to='/dashboard'>
                    <img className={styles.dashButton} src='https://i.pinimg.com/236x/47/59/d7/4759d72744726f90ff3926185e7e3eec.jpg' alt='Luis'/>            
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