import React, { useState, useEffect } from "react";
// import TweetBox from "./TweetBox";
import Post from "../Feed/Post";
import "./Trending.css";
// import db from "./firebase";
// import FlipMove from "react-flip-move";

function Trending() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     db.collection("posts").onSnapshot((snapshot) =>
//       setPosts(snapshot.docs.map((doc) => doc.data()))
//     );
//   }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Explore</h2>
      </div>

    <div class="card">
        <div class="card-body">
        <h6 className="trendingtag">1. Trending</h6>
        <h5 className="tagname">#Indiafightsback</h5>
        </div>
    </div>
          
    </div>
  );
}

export default Trending;