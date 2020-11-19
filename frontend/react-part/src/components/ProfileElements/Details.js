import React, { useState, useEffect, Component } from "react";
import '../ProfileElements/ProfileElements.css'
import { Redirect, Link } from 'react-router-dom';
import Background from '../../assets/images/texting-1490691_1920.jpg'
import Post from '../Feed/Post'
import ServerService from'../../services/ServerService'

class Details extends Component{

  state={
    userdetails:[],
    profiledet:[],
    connect:[]
  }

  componentDidMount(){
    // axios.get('https://60bb5774f441.ngrok.io/')
    ServerService.userdetails()
    .then(response=>{
      console.log(response.data);
      this.setState({userdetails: response.data, profiledet: response.data.profile, connect: response.data.connections})
    })
  }

  render(){
  return (
<>
<div className="feed__header">
<h2>Profile</h2>
</div>

<div className="profilewrap">{/*
<div className="imgbox">
<img src="https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/05/21/Pictures/_037138a2-9b47-11ea-a010-c71373fc244b.jpg" />
</div>
<div className="profiledetails">
  <h4>Username</h4>

</div>
</div> */}

<div className="coverimg" style={{  
// backgroundImage: this.state.uuu,
backgroundImage: "url(" + this.state.profiledet.cover_pic + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>
<img className="profileimg" src={this.state.profiledet.picture} />
</div>
  
<div className="profiledetails">
  <div className="detailsline">
  <div>
<h4 className="personname">{this.state.profiledet.name}</h4>
<h5 className="personusername">@{this.state.userdetails.username}</h5>
</div>
<div><button className="editprofile"><Link 
to= {{
  pathname:'/edit-profile',
  state:{name:this.state.profiledet.name, bio:this.state.profiledet.bio, 
  cover_pic:this.state.profiledet.cover_pic ,picture:this.state.profiledet.picture }
}}
className="editprofiletext">Edit Profile</Link></button></div>
</div>
<p className="biotext">{this.state.profiledet.bio}
  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut mattis nibh lorem. Tincidunt tellus ultricies viverra nunc, diam, at. Tincidunt fermentum in dignissim imperdiet euismod semper ac et. In arcu, fermentum quam diam, quisque massa nec. */}
  </p>

<div className="options">
<Link to="/profile" className="profilenums">
{this.props.propactive==="posts"? <div className="activeoption">
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div>: <div>
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div> }
</Link>

<Link to="/followers"  className="profilenums">
{this.props.propactive==="followers"? <div className="activeoption">
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div>: <div>
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div> }
</Link>

<Link className="profilenums" to="/following">

{this.props.propactive==="following"? <div className="activeoption">
<h5 className="headingnums">{this.state.connect.following}</h5>
<p className="nums">Following</p>
</div>: <div>
<h5 className="headingnums">{this.state.connect.following}</h5>
<p className="nums">Following</p>
</div> }
</Link>

</div>
</div>
</div>
</>

  )
}
}

export default Details;