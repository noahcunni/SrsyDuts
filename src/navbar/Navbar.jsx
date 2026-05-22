import styles from './Navbar.module.css'
import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';

export const Navbar = () => {
    const [ practice, setPractice ] = useState(null);
    
    return (
        <div className={styles.header}>
            <div>
                <navBar className={styles.navBar}>
                    <NavLink to="/writing"
                        className={({ isActive }) =>
                        isActive ? `${styles.button} ${styles.active}`: styles.button}>
                            Writing
                    </NavLink>
                    <NavLink to="/typing"
                        className={({ isActive }) =>
                        isActive ? `${styles.button} ${styles.active}`: styles.button}>
                            Typing
                    </NavLink>
                </navBar>

            </div>
        </div>
    );
}

export default Navbar