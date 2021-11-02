import React, { Component } from 'react';
import './Home.css';
import NavBar from '../../components/Navbar/Navbar'
import Feed from '../../components/Feed/Feed';


class Home extends Component {


  render() {
    return (
      <>
        <NavBar className="navbar" />
        <div className="flexbox">
          {/* <Sidebar propactive="home" /> */}
          {/* <Feed /> */}
          {/* <Widgets /> */}
        </div>
      </>
    )
  }
}


export default Home;

