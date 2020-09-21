import React, { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Vlad_lp",
      caption: "thiscaption",
      imageUrl:
        "https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      username: "Vlad_TEST2",
      caption: "thiscaption is working",
      imageUrl:
        "https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    },
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram_logo"
          className="app__headerImage"
        />
      </div>

      <div className="app__postContainer"></div>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
