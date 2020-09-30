import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import SendIcon from '@material-ui/icons/Send';

function Post({ user, postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    // console.log(event);
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <Avatar className="post__avatar" alt={username} src={username} />
          <h3>{username}</h3>
        </div>

        <MoreHorizIcon />
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <div className="post__icons">
          <div className="post__iconsLeft">
            <FavoriteBorderIcon />
            <ChatBubbleOutlineIcon />
            <ShareIcon />
          </div>
          <div className="post__iconsRight">
            <BookmarkBorderIcon />
          </div>
        </div>
        <strong>{username}</strong> {caption}
        <h3>____</h3>
      </h4>

      <div className="post__comments">
        {comments?.map((comment) => (
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            disabled={!comment}
            className="post__button"
            type="submit"
            onClick={postComment}
          >
            <SendIcon />
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
