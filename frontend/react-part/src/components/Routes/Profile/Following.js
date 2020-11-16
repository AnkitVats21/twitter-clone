import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import FollowingList from '../../ProfileElements/FollowingList'
import Widgets from '../../../components/Widgets/Widgets'

class Profile extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="profile" />
        <FollowingList/>
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Profile;
  