import styles from './Button.module.css'
function HeaderButton(props) {
    return (
        <>
            <button  
                className={styles.headerButton}>
                {props.name}
            </button>
        </>
    );
}

export default HeaderButton