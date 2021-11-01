import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Saved from '../../Saved/Saved'
import Trending from '../../Trending/Trending'
import Widgets from '../../../components/Widgets/Widgets'

class Bookmarks extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        {/* <NavigationBar />      */}
        <Sidebar propactive="bookmarks" />
        <Saved />
        {/* <Trending /> */}
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Bookmarks;
  
  