import React, { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { signInWithGoogle } from "../../services/auth";
import { AiOutlineGoogle } from 'react-icons/ai';
import { redirect } from "react-router-dom";
import './SignInButton.css';

export default function SignInButton() {
    const [, setUser] = useContext(UserContext).user;

    const onSignInBtnClick = async () => {
        let userBySignIn = await signInWithGoogle();
        if (userBySignIn) {
            setUser(userBySignIn)
            redirect('/');
        }
    }

    return (
        <div className="signInBtn" >
            <p className='signIn__link' onClick={onSignInBtnClick} ><AiOutlineGoogle />&nbsp;Sign in With Google</p>
        </div>

    )
};
