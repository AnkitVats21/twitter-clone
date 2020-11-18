import React, { useState, useEffect, Component } from "react";
import '../ProfileElements/ProfileElements.css'
import { Redirect, Link } from 'react-router-dom';
import Background from '../../assets/images/texting-1490691_1920.jpg'
import Details from './Details'
import FollowerCards from '../UI/Cards/FollowerCards/FollowerCards'
import axios from 'axios'

class FollowingList extends Component {

  state={
    followlist: []
  }

  componentDidMount(){
    axios.get('https://50e62b962574.ngrok.io/api/user/following/?user=self',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    .then(response=>{
      console.log(response.data);
      this.setState({followlist: response.data})
    })
  }

render(){

  const followlist= this.state.followlist.map(postlist=>{
    return <FollowerCards displayName={postlist.profile.name} isfollow={postlist.following} username={postlist.profile.username} avatar={postlist.profile_pic}/>
    })

  return (
    <div className="feed">
    <Details propactive="following"/>

    <div className="feed__header">
        <h2>Followers</h2>
      </div>

{/* <FollowerCards
            key="hi"
            displayName="Narendra Modi"
            username="PMOIndia"
            verified="true"
            avatar="data:image/jpeg;base64,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"
            image="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
          /> */}

    {followlist}
    </div>
  );
}
}
export default FollowingList;