import styles from './Button.module.css'
function HeaderButton(props) {
    const handleClick = () => {
            
    };
    return (
        <button onClick={handleClick} className={styles.headerButton}>
            {props.name}
        </button>
    );
}

export default HeaderButton