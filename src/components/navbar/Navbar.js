import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import './Navbar.css';

export default function Navbar() {
    const [user] = useContext(UserContext).user;

    return (
        <div className='navbar'>
            <Link to='/' className='navbar__logo'>GoSocial</Link>

            {user ? <p className='navbar__home'> <span className='navbar__homeColor' >Welcome Home</span> {user.displayName} !</p> : ''}
            {user ? <img className='navbar__img' src={user.photoURL} alt='user' />
                :
                <Link className='navbar__login' to='/login'>Log In</Link>
            }
        </div>
    )
}
