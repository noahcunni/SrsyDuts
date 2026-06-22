import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import styles from './Sign.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { logInUser } = UserAuth();
    const navigate = useNavigate();
    
    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const result = await logInUser(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error.message);
            }
        } catch (err) {
            setError("an error occured")
        } finally {
            setLoading(false);
        }
    };


    return(
        <div className={styles.container}>
            <form onSubmit={handleLogIn} className={styles.formContainer}>
                <h2 className='font-bold pb-2'>Sign in!</h2>
                <p>Don't have an account? <Link to='/signup'>Click here!</Link></p>
                <div className={styles.inputGroup}>
                    <input 
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email' 
                    type="email"
                    />
                    <input 
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type="password"/>
                </div>
                <button type='submit' disabled={loading} className={styles.submitButton}>Sign in!</button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </form>
        </div>
    );
}

export default Login