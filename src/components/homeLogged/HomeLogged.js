import React from 'react';
import CreatePost from '../createPost/CreatePost';
import Feed from '../feed/Feed';
import './HomeLogged.css';

export default function HomeLogged() {
    return (
        <div className='homeLogged'>
            <CreatePost />
            <Feed />

        </div>
    )
}
