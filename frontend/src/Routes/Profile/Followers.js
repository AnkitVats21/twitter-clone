import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import FollowersList from '../../ProfileElements/FollowersList'
import Widgets from '../../../components/Widgets/Widgets'

class Profile extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="profile" />
        <FollowersList/>
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Profile;
  
  