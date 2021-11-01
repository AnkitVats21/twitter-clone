import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import ProfileElements from '../../ProfileElements/ProfileElements'
import Widgets from '../../../components/Widgets/Widgets'
import EditProfileForm from './EditProfileForm'

class EditProfile extends Component {

  
    render() {
      console.log(this.props)
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="profile" />
        {/* <ProfileElements/> */}
        <EditProfileForm name={this.props.location.state.name} bio={this.props.location.state.bio}
  cover_pic={this.props.location.state.cover_pic} picture={this.props.location.state.picture}  />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default EditProfile;
  
  