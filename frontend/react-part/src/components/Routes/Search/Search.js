import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from '../Home/Home.module.css';
// import NavigationBar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed'
import Trending from '../../Trending/Trending'
import NotificationList from '../../NotificationList/NotificationList'
import SearchResults from '../../SearchResults/SearchResults'
import Widgets from '../../../components/Widgets/Widgets'
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

class Search extends Component {



  
    render() {
      console.log(this.props)
      return(
      <div className={classes.flexbox}>
        {/* <NavigationBar />      */}
        <Sidebar propactive="explore" />
        <SearchResults term={this.props.location.state.query}/>
        <Widgets search="hide"/>
      </div>
      )
    }
  }
  
  
  export default withRouter(Search);