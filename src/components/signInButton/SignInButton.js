import React, { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { signInWithGoogle } from "../../services/auth";
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import './SignInButton.css';

export default function SignInButton() {
    const [, setUser] = useContext(UserContext).user;
    const navigate = useNavigate();

    const onSignInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();

        if (userBySignIn) {
            setUser(userBySignIn);
            navigate('/');
        }
    }

    return (
        <div className="signInBtn" >
            <p className='signIn__link' onClick={onSignInBtnClick} ><AiOutlineGoogle />&nbsp;Sign in With Google</p>
        </div>

    )
};
