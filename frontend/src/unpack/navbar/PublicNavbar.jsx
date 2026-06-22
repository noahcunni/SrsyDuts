import styles from './PublicNavbar.module.css';
import { useNavigate, Link } from 'react-router-dom';

function PublicNavbar() {
    const navigate = useNavigate();

    const handleLanding = () => {
        navigate('/');
    };

    return(
        <div className={styles.navbar}>
            <img className={styles.img} onClick={handleLanding} src='https://preview.redd.it/i-drew-lois-griffin-as-l-second-picture-is-with-loiss-colors-v0-fmi3ns9juned1.jpg?width=640&crop=smart&auto=webp&s=ea3516f510b74f5c086cf30082ee6bf00dcb585b' alt='Luis'/>
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