import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
import Sidebar from '../../Sidebar/Sidebar'
import Commentbox from '../../Commentbox/Commentbox'
import Trending from '../../Trending/Trending'
import Widgets from '../../../components/Widgets/Widgets'

class Comments extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
        <Sidebar propactive="home" />
        <Commentbox />
        <Widgets />
      </div>
      )
    }
  }
  
  
  export default Comments;
  
  