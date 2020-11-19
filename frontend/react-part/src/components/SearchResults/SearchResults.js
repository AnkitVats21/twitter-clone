import React, { Component } from "react";
import {Link} from 'react-router-dom'
import Post from "../Feed/Post";
import FollowerCards from "../UI/Cards/FollowerCards/FollowerCards";
import "../Feed/Feed.css";
import "./SearchResults.css"
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

class SearchResults extends Component {

  state={
    savedposts:[],
    followlist:[],
    newsearch:this.props.term,
    postopt: true
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
   }

   showusers=()=>{
     this.setState({postopt:false})
   }

   showposts=()=>{
     this.setState({postopt:true})
   }

  handlesubmit = () => {
    const searchterm=this.state.newsearch
console.log(searchterm)
      axios.get('http://fa067537cf22.ngrok.io/api/search/?query='+searchterm,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
      .then(response=>{
        console.log(response.data);
        this.setState({savedposts: response.data.tweet, followlist: response.data.user})
      })
    

  }

  componentDidMount(){
    axios.get('http://fa067537cf22.ngrok.io/api/search/?query='+this.props.term,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  }
    )
    .then(response=>{
      console.log(response.data);
      this.setState({savedposts: response.data.tweet, followlist: response.data.user})
    })
  }

  render(){

  const postlist= this.state.savedposts.map(postlist=>{
    return <Post image={postlist.photos} likes={postlist.likes} comments={postlist.TotalComments} isliked={postlist.liked} isbookmarked={postlist.bookmarked} key={postlist.id} id={postlist.id} displayName={postlist.name} username={postlist.username} text={postlist.text} avatar={postlist.profile_pic}/>
    })

    const followlist= this.state.followlist.map(postlist=>{
      return <FollowerCards displayName={postlist.profile.name} isfollow={postlist.following} username={postlist.profile.username} avatar={postlist.profile_pic}/>
      })

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Search </h2>
      </div>

      <div className="widget__input">
        
        <input className="widgets__searchbar"  name="newsearch" onChange={this.handlechangeall} placeholder="Search Twitter" type="text" />
        <SearchIcon className="widgets__searchIcon" onClick={this.handlesubmit} />
      </div>

          {this.state.postopt ?<div className="optbar">
            <h3 className="optselected">Posts</h3>
            <h3 onClick={this.showusers}>Users</h3>
          </div>:
          <div className="optbar">
          <h3 onClick={this.showposts}>Posts</h3>
          <h3 className="optselected">Users</h3>
        </div>}

          {this.state.postopt? postlist:followlist}
    </div>
  );
}
}

export default SearchResults;