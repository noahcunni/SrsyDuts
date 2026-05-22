import styles from './ErrorPage.module.css'

function ErrorPage() {
    return(
        <div className={styles.handle}>
            <h1>
                Error 404: Page not found!
            </h1>
        </div>
    );
}

export default ErrorPage