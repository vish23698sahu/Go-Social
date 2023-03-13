import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import Post from '../post/Post';
import SignInButton from '../signInButton/SignInButton';
import './HomeCard.css';

export default function HomeCard(props) {
    const [posts, setPosts] = useState([]);
    const [user] = useContext(UserContext).user;

    useEffect(() => {
        db.collection('static_Posts').onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
            })
            ));
        });
    }, []);

    return (
        <div >
            {!user && <div> <p className='home__p'>Lets share our current working items, progress, and ideas.</p><p className='home__p2'>P.S. No one can ever steal it from you.</p> </div>}

            <div className='homeCard__signIn'>
                <SignInButton />
                <p className='createPost_p' >To view, comment, and share...</p>
            </div>

            <div className='homeCard__container' >
                {posts.map(({ id, post }) => {
                    return <Post
                        key={id}
                        id={id}
                        profileUrl={post.profileUrl}
                        username={post.username}
                        photoURL={post.photoUrl}
                        caption={post.caption}
                        comments={post.comments}
                    />
                })}
            </div>
        </div>
    );
}
