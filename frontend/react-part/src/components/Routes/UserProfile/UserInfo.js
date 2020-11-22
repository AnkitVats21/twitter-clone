import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Post from '../../Feed/Post'
import ServerService from '../../../services/ServerService'
import axios from 'axios'

class UserInfo extends Component {
    state={
        userdetails:[],
        profiledet:[],
        connect:[]
      }

      componentDidMount(){
        
            const data=this.props.userid

          ServerService.otherdetails(data)
        .then(response=>{
          console.log(response.data);
          this.setState({userdetails: response.data, profiledet: response.data.profile, connect: response.data.connections})
        })
      }

      render(){

return(
    <>
<div className="feed__header">
<h2>Profile</h2>
</div>
<div className="profilewrap">
<div className="coverimg" style={{  
backgroundImage: "url(" + this.state.profiledet.cover_pic + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>
<img className="profileimg" src={this.state.profiledet.picture} />
</div>
  
<div className="profiledetails">
<h4 className="personname">{this.state.profiledet.name}</h4>
<h5 className="personusername">@{this.state.userdetails.username}</h5>
<p className="biotext">{this.state.profiledet.bio}
  </p>

<div className="options">
<Link to="/user-profile" className="profilenums">
{this.props.propactive==="posts"? <div className="activeoption">
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div>: <div>
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div> }
</Link>

<Link to="/user-followers"  className="profilenums">
{this.props.propactive==="followers"? <div className="activeoption">
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div>: <div>
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div> }
</Link>

<Link className="profilenums" to="/user-following">

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
);
}
}

export default UserInfo;
