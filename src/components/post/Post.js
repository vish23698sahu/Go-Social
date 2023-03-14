import React, { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { UserContext } from '../../contexts/user';
import { db, storage } from '../../firebase';
import Comment from '../comment/Comment';
import CommentInput from '../commentInput/CommentInput';
import './Post.css';

export default function Post({ profileUrl, username, id, photoURL, caption, comments, noDelete }) {
    const [user] = useContext(UserContext).user;

    const deletePost = () => {
        // delete the image from firebase storage
        //get ref to the image file to delete
        var imageRef = storage.refFromURL(photoURL);

        // user can only delete their own posts: 
        if (username === user.email.replace('@gmail.com', '')) {
            imageRef.delete()
                .then(function () {
                    console.log("deleted successfully");
                })
                .catch((error) => {
                    console.log(error);
                });
            db.collection("posts").doc(id).delete()
                .then(() => {
                    console.log("deleted post successfully");
                })
                .catch((error) => {
                    console.log(`Error post : ${error}`);
                });
        }
        else {
            alert("You don't have permission to delete someone else's post");
        }

    }

    return (
        <div className='post'>
            <div className='post__header'>
                <div className='post__headerLeft'>
                    <img src={profileUrl} alt={profileUrl} className='post__profilePic' />
                    <p style={{ marginLeft: '8px', fontWeight: '500' }} >{username}</p>
                </div>
                {noDelete ? '' : <button onClick={deletePost} className='post__delete' ><AiFillDelete /> </button>}
            </div>
            <div className='post__center'>
                <img src={photoURL} alt={photoURL} className='post__photoURL' />
            </div>

            <div className='post_alignComment'>
                <p>
                    <span style={{ fontWeight: "590", marginRight: "8px" }} >{username}</span>
                    {caption}
                </p>
            </div>

            {
                comments ?
                    comments.map((comment, i) => (
                        <Comment key={i} username={comment.username} caption={comment.comment} />
                    ))
                    : <></>
            }

            {user ? <CommentInput comments={comments} id={id} /> : <></>}

        </div>
    )
}
