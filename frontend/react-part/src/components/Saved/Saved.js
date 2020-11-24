import React, { Component } from "react";
// import TweetBox from "./TweetBox";
import Post from "../Feed/Post";
import "../Feed/Feed.css";
import axios from "axios";
import MenuIcon from '@material-ui/icons/Menu';
// import db from "./firebase";
// import FlipMove from "react-flip-move";
import ServerService from '../../services/ServerService'


class Saved extends Component {

  
  state={
    postlist:[]
  }
  
  deletepost=(index, tweetid)=>{

    let oldItems = this.state.postlist;
    oldItems.splice(index,1);
    this.setState({postlist : oldItems});
  
    ServerService.deletepost(tweetid)
    .then(response=>{
      console.log(response);
    })
  }
  
  componentDidMount(){
    ServerService.bookmarkedposts()
    .then(response=>{
      console.log(response);
      this.setState({postlist: response.data})
    })
  }
  
  render(){
  
    const postlist= this.state.postlist.map((postlist,index)=>{
      return <Post image={postlist.photos} retweeted={postlist.retweeted} isowned={postlist.owner} 
      deletepost={this.deletepost} postindex={index} likes={postlist.likes} comments={postlist.TotalComments} 
      isliked={postlist.liked} isbookmarked={postlist.bookmarked} key={postlist.id} id={postlist.id} user={postlist.user_id}
      displayName={postlist.name} username={postlist.username} text={postlist.text} avatar={postlist.profile_pic}
      rtweet={postlist} retweetcount={postlist.retweets}
      />
      })
  
    return (
      <div className="feed">
      <MenuIcon class="hamburgericon"/>
        <div className="feed__header">
          <h2>Bookmarks</h2>
        </div>
  
            {postlist}
      </div>
    );
          }
  }
  

export default Saved;