import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Post from '../../Feed/Post'
import ServerService from '../../../services/ServerService'
import axios from 'axios'
import UserInfo from '../UserProfile/UserInfo'

class ProfileElements extends Component {

    state={
      postlist:[]
      }
    
      componentDidMount(){
        const data= this.props.userid
        console.log(data)
        ServerService.otherposts(data)
        .then(response=>{
          console.log(response);
          this.setState({postlist: response.data})
        })
      }

      render(){

        const postlist= this.state.postlist.map((postlist,index)=>{
          return <Post image={postlist.photos} retweeted={postlist.retweeted} isowned={postlist.owner} 
          deletepost={this.deletepost} postindex={index} likes={postlist.likes} comments={postlist.TotalComments} 
          isliked={postlist.liked} isbookmarked={postlist.bookmarked} key={postlist.id} id={postlist.id} 
          displayName={postlist.name} username={postlist.username} text={postlist.text} avatar={postlist.profile_pic}
        rtweet={postlist}
          />
          })

  return (
    <div className="feed">

<UserInfo userid={this.props.userid} propactive="posts"/>

    <div className="feed__header">
        <h2>Posts</h2>
      </div>
      
      {postlist}
          

    </div>
  );
}
}

export default ProfileElements;