import React, { useContext, useEffect, useState } from 'react';
import SignInButton from '../signInButton/SignInButton';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import Post from '../post/Post';
import './HomeCard.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

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
        <div className='homeCard_main'>
            {!user &&
                <div>
                    <p className='home__p'>GoSocial is a social platform for sharing your creativity and productivity journey.<br />
                        Engage, interact, and inspire others as you express your ideas, achievements, and challenges.<br />
                        It's where work meets passion, innovation meets collaboration, and you meet the world.
                    </p>
                </div>
            }<br />

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
                        noDelete={true}
                    />
                })}
            </div>

            <div className='home__Cardcontainer'>
                <div className='homeCard__Card'>
                    <div className='card_text'>
                        <div className='text_container'>
                            <h3>Share Your Progress</h3>
                            <p>
                                GoSocial is a space to showcase your work.
                                Are you in the middle of an exciting project?
                                Share your work-in-progress and receive constructive feedback from our supportive community.
                                Keep everyone updated with your progress and watch as your ideas come to life!
                            </p>
                        </div>
                        <div>
                            <BsFillArrowRightCircleFill className='iconn' />
                        </div>
                    </div>
                </div>
                <div className='homeCard__Card'>
                    <div className='card_text'>
                        <div>
                            <div className='text_container'>
                                <h3>Spread Your Ideas</h3>
                                <p>
                                    Got a creative idea or an innovative solution?
                                    Share it with the world on GoSocial!
                                    Our platform connects you with like-minded individuals who can help bring your ideas to fruition.
                                    Let's start a brainstorming revolution together!
                                </p>
                            </div>
                        </div>
                        <div>
                            <BsFillArrowRightCircleFill className='iconn' />
                        </div>
                    </div>
                </div>
                <div className='homeCard__Card'>
                    <div className='card_text'>
                        <div className='text_container'>
                            <div>
                                <h3>Learn and Grow</h3>
                                <p>
                                    Your journey doesn't have to be alone.
                                    GoSocial offers a rich community of experts and enthusiasts alike,
                                    all willing to share their experience and knowledge.
                                    Engage in insightful discussions, ask questions, provide answers, and learn from the best.
                                </p>
                            </div>
                        </div>
                        <div>
                            <BsFillArrowRightCircleFill className='iconn' />
                        </div>
                    </div>
                </div>
                <div className='homeCard__Card'>
                    <div className='card_text'>
                        <div className='text_container'>

                            <div>
                                <h3>Collaborate and Network</h3>
                                <p>
                                    Beyond sharing and learning, GoSocial opens doors to collaboration and networking.
                                    Connect with professionals and enthusiasts from different industries and areas of expertise.
                                    Work together on shared interests, or simply form connections that could lead to incredible opportunities!
                                </p>
                            </div>
                        </div>
                        <div>
                            <BsFillArrowRightCircleFill className='iconn' />
                        </div>
                    </div>
                </div>
                <div className='homeCard__Card'>
                    <div className='card_text'>
                        <div className='text_container'>
                            <div>
                                <h3>Celebrate Your Success</h3>
                                <p>
                                    Every milestone matters! Celebrate your accomplishments and share your success stories with the GoSocial community.
                                    Let your victories, big or small, inspire others and pave the way for collective growth.
                                </p>
                            </div>
                        </div>
                        <div>
                            <BsFillArrowRightCircleFill className='iconn' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
