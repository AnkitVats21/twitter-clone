import React, {Component } from "react";
import Post from "../Feed/Post";
import "./Trending.css";
import axios from 'axios'
import TrendingCards from '../UI/Cards/TrendingCards/TrendingCards'

class Trending extends Component {

  state={
    savedposts:[]
  }

  componentDidMount(){
    axios.get('http://04f70d4ed7ff.ngrok.io/api/trending/')
    .then(response=>{
      console.log(response);
      this.setState({savedposts: response.data})
    })
  }

  render(){

    const postlist= this.state.savedposts.map(postlist=>{
      return <TrendingCards serial={postlist.serial_no} hashtag={postlist.hashtag} count={postlist.count}/>
      })

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Explore</h2>
      </div>

    {/* <div class="card">
        <div class="card-body">
        <h6 className="trendingtag">1. Trending</h6>
        <h5 className="tagname">#Indiafightsback</h5>
        </div>
    </div> */}

    {/* <TrendingCards /> */}
    {postlist}
          
    </div>
  );
}
}

export default Trending;