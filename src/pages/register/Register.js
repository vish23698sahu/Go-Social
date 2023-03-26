import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInButton from '../../components/signInButton/SignInButton';
import { UserContext } from '../../contexts/user';
import './Register.css';

export default function Register() {
    const [, setUser] = useContext(UserContext).user;
    const { signUp } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [validForm, setValidForm] = useState(true);
    const navigate = useNavigate();

    const signUpClickHandler = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setValidForm(false);
            return;
        }
        try {
            let userBySignIn = await signUp(email, password);

            if (userBySignIn) {
                setUser(userBySignIn);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const emailChangeHandler = (e) => {
        setValidForm(true);
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setValidForm(true);
        setPassword(e.target.value);
    }

    return (
        <div className='register__container' >
            <div className='register__box' >
                <form>
                    <h2 className='register__h2' >Sign Up</h2>
                    {validForm ? '' : <p className='register__valid'>Please enter email and password</p>}
                    <input className='register__email' type='text' value={email} placeholder='email' onChange={emailChangeHandler} /><br /><br />
                    <input className='register__password' type='password' password={password} placeholder='password' onChange={passwordChangeHandler} /><br />

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
