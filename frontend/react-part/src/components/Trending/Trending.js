import React, { useState, useEffect } from "react";
import Post from "../Feed/Post";
import "./Trending.css";


function Trending() {

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