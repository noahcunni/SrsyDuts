import styles from './PublicNavbar.module.css';
import { useNavigate, Link } from 'react-router-dom';

function PublicNavbar() {
    const navigate = useNavigate();

    const handleLanding = () => {
        navigate('/');
    };

    return(
        <div className={styles.navbar}>
            <h1 className={styles.icon}>間隔学習</h1>
            <div className={styles.navbarButtonGroup}>
                <Link to="/about" className={styles.aboutButton}>About</Link>
                <div className={styles.authButtonGroup}>
                    <Link to='/signup' className={styles.authButton}>Sign up</Link>
                    <Link to='/signin' className={styles.authButton}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default PublicNavbar