import React from "react";
import './Post.css'

function Post() {
  return (
    <div className="post">
      <h3>Username</h3>
      <img
        className="post__image"
        src="https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      <h4 className='post__text'> <strong>Username</strong>  Hello i 'am the caption</h4>
    </div>
  );
}

export default Post;
