import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signUpNewUser(email, password);

            if (result.success) {
                navigate('/home');
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
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Sign up now!</h2>
                <p>Already have an account? <Link to='/login'>Login now!</Link></p>
                <div>
                    <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email' 
                    className='border p-3 mt-2' 
                    type="email"
                    />
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='border p-3 mt-2' 
                    type="password"/>
                    <button type='submit'disabled={loading} className='mt-6 w-full'>Sign up!</button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default Signup