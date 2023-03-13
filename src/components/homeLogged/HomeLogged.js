import React from 'react';
// import { UserContext } from '../../contexts/user';
import CreatePost from '../createPost/CreatePost';
import Feed from '../feed/Feed';
import './HomeLogged.css';

export default function HomeLogged() {
    // const [user, setUser] = useContext(UserContext).user;

    return (
        <div className='homeLogged'>
            <CreatePost />
            <Feed />

        </div>
    )
}
