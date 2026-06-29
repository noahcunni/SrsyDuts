import { Link } from 'react-router';
import styles from './Review.module.css';
function Review({ cards }) {
    return(
        <div className={styles.body}>
            <Link to='/dashboard' className={styles.dashboardButton}>To Dashboard</Link>
        </div>
        
    );
}

export default Review