import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Widgets from '../../../components/Widgets/Widgets'

class Messages extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        {/* <NavigationBar />      */}
        <Sidebar propactive="messages" />
        <Feed />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Messages;
  
  