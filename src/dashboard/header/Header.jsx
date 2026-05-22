import HeaderButton from '../buttons/HeaderButton'
import styles from './Header.module.css'
function Header() {
    
    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.label}>
                    Buttons
                </h2>
                <nav className={styles.buttonContainer}>
                    <HeaderButton name="login"/>
                    <HeaderButton name='start'/>
                    <HeaderButton name='settings'/>
                </nav>
            </div>
        </>
    );
}

export default Header;