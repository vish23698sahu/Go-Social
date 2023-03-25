import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInButton from '../../components/signInButton/SignInButton';
import { UserContext } from '../../contexts/user';
import './Login.css';

export default function Login() {
    const [, setUser] = useContext(UserContext).user;
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const loginClickHandler = async (e) => {
        e.preventDefault();
        try {
            let userBySignIn = await login(email, password);

            if (userBySignIn) {
                setUser(userBySignIn);
                navigate('/');
            }
        }
        catch (error) {
            console.log('Failed to sign in ', error);
        }
    }

    return (
        <div className='login__container' >
            <div className='login__box' >
                <form>
                    <h2 className='login__h2' >Login</h2>
                    <input className='login__email' type='text' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br /><br />
                    <input className='login__password' type='password' password={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br />

                    <button className='login__login' onClick={loginClickHandler} >Login</button><br /><br /><br />
                    <hr /><br />
                    <div className='login__google' ><SignInButton /></div>
                    <hr /><br /><br />
                    <div>
                        Don't have an account ? <Link to='/register' className='login__signUp'>Sign Up</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
