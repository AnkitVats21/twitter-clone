import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
import Sidebar from '../../Sidebar/Sidebar'
import ChatList from '../../Chats/ChatList'
import Widgets from '../../../components/Widgets/Widgets'

class Messages extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="messages" />
        <ChatList />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Messages;
  
  