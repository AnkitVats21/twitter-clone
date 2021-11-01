import React, { Component } from 'react';
import classes from './Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Widgets from '../../../components/Widgets/Widgets'


class Home extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        {/* <NavigationBar />      */}
        <Sidebar propactive="home" />
        <Feed />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Home;
  
  