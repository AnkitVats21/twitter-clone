import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import Widgets from '../../../components/Widgets/Widgets'

class Notifications extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        {/* <NavigationBar />      */}
        <Sidebar propactive="notifications" />
        {/* <Feed /> */}
        {/* <Trending /> */}
        <NotificationList />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Notifications;
  
  