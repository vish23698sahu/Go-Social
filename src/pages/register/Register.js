import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SignInButton from '../../components/signInButton/SignInButton';
import { UserContext } from '../../contexts/user';
import './Register.css';

export default function Register() {
    const { signUp } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const signUpClickHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await signUp(email, password)
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register__container' >
            <div className='register__box' >
                <form>
                    <h2 className='register__h2' >Sign Up</h2>
                    <input className='register__email' type='text' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br /><br />
                    <input className='register__password' type='password' password={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br />

                    <button className='register__signUp' onClick={signUpClickHandler} >Sign Up</button><br /><br /><br />
                    <hr /><br />
                    <div className='register__google' ><SignInButton /></div>
                    <hr /><br /><br />
                    <div>
                        Existing User ? <Link to='/login' className='register__login'>Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
