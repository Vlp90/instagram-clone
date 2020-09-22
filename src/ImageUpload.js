import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./ImageUpload.css";
import { db, storage } from "./firebase.js";
import firebase from "firebase";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  //   const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("handleUpload");
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress Function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // ERROR FUNCTION
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image to db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      {/* <div className="imageupload__icon">

<AddIcon />
</div> */}
      <div className="imageupload__container">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <div className="imageupload__captionFile">
          <input
            type="text"
            placeholder="Enter a caption.."
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
          />
          <div class="button-wrapper">
            <span class="label">Upload File</span>
            <input
              type="file"
              name="upload"
              id="upload"
              class="upload-box"
              placeholder="Upload File"
              onChange={handleChange} 
            />
          </div>
          {/* <input type="file" onChange={handleChange} /> */}
          <div className="imageupload__button">

          <Button onClick={handleUpload}>
            <SendIcon />
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
