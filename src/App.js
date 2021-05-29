import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { db, auth } from "./firebase";
import { Button, Avatar, makeStyles, Modal, Input } from "@material-ui/core";
import FlipMove from "react-flip-move";
import InstagramEmbed from "react-instagram-embed";
import HomeIcon from "@material-ui/icons/Home";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
// import SearchIcon from "@material-ui/icons/Search";
import Story from "./Story";
import Suggestion from "./Suggestion";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user keeps on logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };
  // const getData=()=>{

  // }
  // const [users, setUsers] = useState([]);
  // const getData = async () =>{
  //   const response = await fetch('https://randomuser.me/api/')
  //   setUsers(await response.json())

  // }

  // useEffect(() => {
  //   getData();
  // }, []);
  // console.log(getData)

  //   useEffect(()=>{
  //     setGetData( fetch('',{headers:{ 'Content-Type': 'application/json',
  //     'Accept': 'application/json'}}).then((res)=>{
  // return res.json()
  //     }))
  //   },[])

  //   const urlUsername = username.toString().toLowerCase();
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img className="app__headerImage" src="instanger.png" alt="" />
            </center>

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

            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Modal>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img className="app__headerImage" src="instanger.png" alt="" />
            </center>
            <Input
              type="text"
              placeholder="username"
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
            <Button onClick={handleRegister}>Register</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="instanger.png" alt="" />
        <div className="app__headerCenter">
          <input type="text" className="" placeholder="Search" />
        </div>

        {user?.displayName ? (
          <div className="app__headerRight">
            <HomeIcon className="app__headerRight__icons" />
            <ChatOutlinedIcon className="app__headerRight__icons" />
            <ExploreOutlinedIcon className="app__headerRight__icons" />
            <FavoriteBorderOutlinedIcon className="app__headerRight__icons" />

            <Avatar
              className="app__headerAvatar"
              alt={user.displayName}
              src={`https://avatars.dicebear.com/api/human/${user.displayName}.svg?mood[]=happy`}
            />
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <form className="app__loginHome">
            <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
          </form>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          <div className="app__storyLeft">
            {posts.slice(-1).map(({ id, post }) => (
              <Story username={post.username} key={id} />
            ))}

            <Story username="Aalia Boase" />
            <Story username="Ishita Bedi" />
            <Story username="Shresth Tandon" />
            <Story username="Mitra Deshmukh" />
            <Story username="Parth Gade" />
            <Story username="Ryka Singhal" />
            <Story username="Ankur Korpal" />
            <Story username="Niraj Golla" />
          </div>

          <FlipMove>
            {posts.map(({ id, post }) => (
              <Post
                user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </FlipMove>
        </div>
        <div className="app__postsRight">
          {user?.displayName ? (
            <div>
              <div className="app__postsRight__top">
                <Avatar
                  className="app__headerAvatar"
                  alt={user.displayName}
                  src={`https://avatars.dicebear.com/api/human/${user.displayName}.svg?mood[]=happy`}
                />
                <div className="app__headerText">
                  <h5>{user.displayName}</h5>
                  <h6>{user.email}</h6>
                </div>
              </div>
              <div className="app__postsRight__bottom">
                <h5>Suggestions For You</h5>
                <Suggestion suggestionUsername="Anaya Arora" />
                <Suggestion suggestionUsername="Trishna Dani" />
                <Suggestion suggestionUsername="Ankur Bhagat" />
                <Suggestion suggestionUsername="Valini Mall" />
                <Suggestion suggestionUsername="Avinash Krish" />
              </div>
              <div className="suggestion__bottom">
                <p>About</p>
                <p>• Help</p>
                <p>• Press</p>
                <p>• API</p>
                <p>• Jobs</p>
                <p>• Privacy</p>
                <p>• Terms</p>
                <p>• Locations</p>
                <p>• Top</p>
                <p>• Accounts</p>
                <p>• Hashtags</p>
                <p>• Language</p>
                <h6>English © 2021 INSTANGER BY CHITVAN GARG</h6>
              </div>
            </div>
          ) : (
            <h4>Login To Upload ☝️</h4>
          )}
        </div>
      </div>

      {user?.displayName ? (
        <div className="app__upload">
          <ImageUpload username={user.displayName} />
        </div>
      ) : (
        <center></center>
      )}
    </div>
  );
}

export default App;
