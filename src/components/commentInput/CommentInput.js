import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import './CommentInput.css';
import { BsFillSendFill } from 'react-icons/bs';

export default function CommentInput({ comments, id }) {
    const [user] = useContext(UserContext).user;
    const [comment, setComment] = useState('');
    const [commentArray] = useState(comments ? comments : []);

    const addComment = () => {
        if (comment === '')
            return;
        else if (comment !== "") {
            // Add comment to post info
            commentArray.push({
                comment: comment,
                username: user.email.replace("@gmail.com", "").toLowerCase(),
            });
            db.collection("posts").doc(id).update({ comments: commentArray })
                .then(() => {
                    setComment("");
                })
                .catch((error) => {
                    console.log(`Error : ${error}`);
                });
        }

    }

    return (
        <div className='commentInput'>
            <textarea
                rows='1'
                className='commentInput__textarea'
                placeholder='write a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <button onClick={addComment} className='commentInput__btn' ><BsFillSendFill /> </button>
        </div>
    )
}
