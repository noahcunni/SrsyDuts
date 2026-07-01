import { Link } from 'react-router';
import styles from './Review.module.css';
function Review({ cards }) {
    return(
        <div className={styles.body}>
            <p className={styles.prompt}>LESSON COMPLETE</p>
            
            <Link to='/dashboard' className={styles.dashboardButton}>To Dashboard</Link>
        </div>
        
    );
}

export default Review