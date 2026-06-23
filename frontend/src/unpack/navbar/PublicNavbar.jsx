import styles from './PublicNavbar.module.css';
import { useNavigate, Link } from 'react-router-dom';

function PublicNavbar() {
    const navigate = useNavigate();

    const handleLanding = () => {
        navigate('/');
    };

    return(
        <div className={styles.navbar}>
            <img className={styles.img} onClick={handleLanding} src='https://i.pinimg.com/236x/47/59/d7/4759d72744726f90ff3926185e7e3eec.jpg' alt='Luis'/>
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