import React, { Component } from "react";
import '../Trending/Trending.css';
import ServerService from '../../services/ServerService'
import MenuIcon from '@material-ui/icons/Menu';
import NotificationCard from '../UI/Cards/NotificationCard/NotificationCard'
import Loader from 'react-loader-spinner'

class NotificationList extends Component {

  state = {
    isloading: true,
    notificationlist: [],
    error: null
  }

  componentDidMount() {

    ServerService.notifications()
      .then(response => {
        console.log(response.data);
        this.setState({ notificationlist: response.data, isloading: false })
      })
  }
  render() {

    const notificationlist = this.state.notificationlist.map(notificationlist => {
      return <NotificationCard notificationtext={notificationlist.extra.tweet_data} type={notificationlist.category} tweetid={notificationlist.extra.tweet_id} profilepic={notificationlist.extra.profile_pic} tweetdata={notificationlist.extra.notification_data} />
    })

    if (this.state.isloading) {
      return (
        <div className="feed">
          <Loader
            type="TailSpin"
            color="#657EFF"
            height={100}
            width={100}
            className="profilespinner"
          />
        </div>
      );
    }

    else {

      return (
        <div className="feed">
          <div className="feed__header">
            <h2>Notifications</h2>
          </div>
          <MenuIcon class="hamburgericon" />
          {/* <NotificationCard notificationtext="yo yuoyoodtysxodrop"/>
    <NotificationCard notificationtext="yo yuoyoodtysxodrop"/> */}
          {notificationlist}
        </div>
      );
    }
  }
}

export default NotificationList;