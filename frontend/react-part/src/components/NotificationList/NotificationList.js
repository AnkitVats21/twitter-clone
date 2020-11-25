import React, { useState, useEffect, Component } from "react";
import '../Trending/Trending.css';
import {ReactComponent as Star} from '../../assets/icons/Star.svg'
import ServerService from'../../services/ServerService'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import NotificationCard from '../UI/Cards/NotificationCard/NotificationCard'

class NotificationList extends Component {

  state = {
    isLoading: true,
    notificationlist: [],
    error: null
  }

  componentDidMount(){

  ServerService.notifications()
    .then(response=>{
      console.log(response.data);
      this.setState({notificationlist: response.data, isLoading:false})
    })
  }
render(){

  const notificationlist= this.state.notificationlist.map(notificationlist=>{
    return <NotificationCard notificationtext={notificationlist.extra.tweet_data} type={notificationlist.category} tweetid={notificationlist.extra.tweet_id} profilepic={notificationlist.extra.profile_pic} tweetdata={notificationlist.extra.notification_data}/>
    })

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Notifications</h2>
      </div>
      <MenuIcon class="hamburgericon"/>
    {/* <NotificationCard notificationtext="yo yuoyoodtysxodrop"/>
    <NotificationCard notificationtext="yo yuoyoodtysxodrop"/> */}
          {notificationlist}
    </div>
  );
}
}

export default NotificationList;