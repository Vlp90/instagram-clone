import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([
    // {
    //   username: "Vlad_lp",
    //   caption: "thiscaption",
    //   imageUrl:
    //     "https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    // },
    // {
    //   username: "Vlad_TEST2",
    //   caption: "thiscaption is working",
    //   imageUrl:
    //     "https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    // },
  ]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    // keep the user logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // uers is logged in
        setUser(authUser);
        console.log(authUser);
      } else {
        //user is logged out
        setUser(null);
      }
    });

    return () => {
      // perform some actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    // create user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* MODAL SIGN UP */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram_logo"
                className="app__headerImage"
              />

              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button onClick={signUp}>Sign Up</Button>
              {/* <Button onClick={handeLogin}>Login</Button> */}
            </form>
          </center>
        </div>
      </Modal>

      {/* MODAL SIGN IN */}

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram_logo"
                className="app__headerImage"
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button onClick={signIn}>Sign In</Button>
              {/* <Button onClick={handeLogin}>Login</Button> */}
            </form>
          </center>
        </div>
      </Modal>

      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram_logo"
          className="app__headerImage"
        />
        {user ? (
          <div className="app__logoutContainer">
          <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
          user={user}
            postId={id}
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>

      
      {user?.displayName ? (
        <ImageUpload username={user?.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
