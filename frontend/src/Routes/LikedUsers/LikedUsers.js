import React, {Component} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import classes from '../Home/Home.module.css'
import Post from '../../Feed/Post'
import Sidebar from '../../Sidebar/Sidebar'
import Widgets from '../../Widgets/Widgets'
import FollowerCards from '../../UI/Cards/FollowerCards/FollowerCards'
import ServerService from '../../../services/ServerService'

class LikedUsers extends Component {

    state={
        followlist: []
      }

componentDidMount(){
  const data= this.props.location.state.postid
    ServerService.likedusers(data)
  .then(response=>{
    console.log(response);
    this.setState({followlist: response.data})
  })
}


render(){

  console.log(this.props.location.state.postid)

    const followlist= this.state.followlist.map(postlist=>{
        return <FollowerCards displayName={postlist.profile.name} id={postlist.profile.id} 
        isfollow={postlist.following} username={postlist.profile.username} avatar={postlist.profile.picture}/>
        })

  return (
    <div className={classes.flexbox}>
      <Sidebar propactive="Home" />

      <div className="feed">

    <div className="feed__header">
        <h2>Liked By</h2>
      </div>

    {followlist}
    </div>

    <Widgets />
    </div>
  );
        }
}

export default LikedUsers;