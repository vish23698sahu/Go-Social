import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { MdAddAPhoto } from 'react-icons/md';
import './CreatePost.css';
import makeId from '../../helper/functions';
import { db, storage } from '../../firebase';
import firebase from 'firebase/compat/app';


export default function CreatePost() {
    const [user] = useContext(UserContext).user;
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleImgChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById('image-preview');

            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    }

    const handleUpload = () => {
        if (image) {
            var imageName = makeId(10);
            // upload the image in the firebase store
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

            uploadTask.on("state_changed", (snapshot) => {
                //progress...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            }, (error) => {
                console.log(error);
            }, () => {
                //get download URL and upload the post info - in firebase
                storage.ref("images").child(`${imageName}.jpg`).getDownloadURL()
                    .then((imageUrl) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            photoUrl: imageUrl,
                            username: user.email.replace("@gmail.com", ""),
                            profileUrl: user.photoURL
                        });
                    });

                setCaption("");
                setProgress(0);
                setImage(null);
                document.getElementById("image-preview").style.display = "none";
            })
        }
    }


    return (
        <div className='createPost'>
            <div className='createPost__loggedIn'>
                <p>Create Post</p>
                <div className='createPost__loggedInCenter'>
                    <textarea
                        className='createPost__textarea'
                        rows='3'
                        placeholder='your caption here...'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    >
                    </textarea>
                    <div className='createPost__imagePreview' >
                        <img id="image-preview" alt='post preview' />
                    </div>
                </div>
                <div className='createPost__Bottom' >
                    <div className='createPost__ImageUpload' >
                        <label htmlFor='fileInput'>
                            <MdAddAPhoto style={{ cursor: 'pointer', fontSize: '23px' }} />
                        </label>
                        <input id='fileInput' type='file' accept='image/*' onChange={handleImgChange} />
                    </div>
                    <button className='createPost__uploadBtn' onClick={handleUpload} style={{ color: caption ? "#000" : "lightgrey" }} >
                        {`Upload ${progress !== 0 ? `${progress}%` : ""}`}
                    </button>
                </div>
            </div>

        </div>
    )
}
