import React from "react";
import "./App.css";
import Post from './Post'

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram_logo"
          className="app__headerImage"
        />

      </div>

      <div className="app__postContainer">

      </div>
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  );
}

export default App;
