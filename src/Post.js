import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="username"
          src="https://avatars2.githubusercontent.com/u/60354600?s=460&u=ea72ead94f36abf967b108c3067f75564cf4875b&v=4"
        />
        <h3>Username</h3>
      </div>

      <img
        className="post__image"
        src="https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
      <h4 className="post__text">
        {" "}
        <strong>Username</strong> Hello i 'am the caption
      </h4>
    </div>
  );
}

export default Post;
