import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import ProfileElements from './ProfileDetails'
import Widgets from '../../../components/Widgets/Widgets'

class UserProfile extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="profile" />
        <ProfileElements/>
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default UserProfile;
  
  