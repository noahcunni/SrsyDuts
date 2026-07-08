import styles from './PublicNavbar.module.css';
import { useNavigate, Link } from 'react-router-dom';

function PublicNavbar() {
    const navigate = useNavigate();

    const handleLanding = () => {
        navigate('/');
    };

    return(
        <div className={styles.navbar}>
            <div className={styles.iconBox}>
                <p className={styles.icon}>学</p>
                <p className={styles.title}>SrsyDuts</p>
            </div>
            
            <div className={styles.navbarButtonGroup}>
                <Link to="/" className={styles.borderlessLink}>How it works</Link>
                <div className={styles.authButtonGroup}>
                    <Link to='/signup' className={styles.authButton}>Sign up</Link>
                    <Link to='/signin' className={styles.authButton}>Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default PublicNavbar