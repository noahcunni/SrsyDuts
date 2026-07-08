import { Link } from 'react-router';
import styles from './Review.module.css';
function Review({ cards }) {
    return(
        <div className={styles.body}>
            <p className={styles.finishedPrompt}>You have finished all your typing cards for today!</p>

            <Link to='/dashboard' className={styles.dashButton}>Back to Dashboard</Link>
        </div>
    );
}


export default Review