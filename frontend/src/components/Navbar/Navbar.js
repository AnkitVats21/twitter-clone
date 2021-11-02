import React, { Component } from 'react';
import './Navbar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Input } from 'antd';
import { NavLink } from 'react-router-dom';


// const { Search } = Input;

class NavigationBar extends Component {

  render() {

    return (

      <Navbar>
        <span className="brand" to="/dashboard">
          t
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="search">
            <Input placeholder="Search" style={{ width: 500, marginLeft: 20 }} />
          </div>
          <Nav className="ml-auto" >
            <NavLink className="logopt" to="/dashboard"><i class="fas fa-home"></i></NavLink>
            <NavLink className="logopt" to="/explore"><i class="fas fa-compass"></i></NavLink>
            <NavLink className="logopt" to="/dashboard"><i class="fa fa-bell" aria-hidden="true"></i></NavLink>
            <NavLink className="logopt" to="/inbox"><i class="fa fa-envelope" ></i></NavLink>
            <NavLink className="logopt" to="/profile"  > <i className="fa fa-user" aria-hidden="true"></i></NavLink>
            <NavLink className="logopt" to="/dashboard"><i className="fa fa-edit" aria-hidden="true"></i></NavLink>
          </Nav>

        </Navbar.Collapse>
      </Navbar>

    );

  }

}



export default NavigationBar;
