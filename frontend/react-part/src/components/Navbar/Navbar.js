import React, { Component } from 'react';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, Redirect, BrowserRouter as Router } from 'react-router-dom';



class NavigationBar extends Component{

  render() {

      return(

<Navbar bg="light" expand="lg" sticky="top" className={classes.navshadow}>
            <span className={classes.brand} to="/">
              Twitter

            </span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto"> 
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i className="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
              <Nav className="ml-auto" >
                <Nav.Link  className={classes.logopt} to="/add-recipe"><i class="fas fa-hashtag"></i>Explore</Nav.Link>
                <Nav.Link  className={classes.logopt} to="/add-recipe"><i class="fa fa-bell" aria-hidden="true"></i>Notifications</Nav.Link>
                <Nav.Link  className={classes.logopt} to="/add-recipe"><i class="fa fa-envelope" ></i>Messages</Nav.Link>
                <Nav.Link  className={classes.logopt} to="/add-recipe"><i className="fa fa-edit" aria-hidden="true"></i>Post</Nav.Link>
                <Nav.Link className={classes.logopt} ><i className="fa fa-user" aria-hidden="true"></i>My Profile</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>

      );

// return(

//   <Navbar bg="light" expand="lg" sticky="top">
//     <span className={classes.brand} to="/">Foodex</span>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//     <Form inline className="ml-auto"> 
//                   <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
//                   />
//                   <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
//                 </Form>
//       <Nav className="ml-auto">
//         <Nav.Link  className={classes.navoptions}>Sign In</Nav.Link>
//         <Nav.Link  className={classes.navoptions}>Sign Up</Nav.Link>
//       </Nav>
      
//     </Navbar.Collapse>
//   </Navbar>

//         );
}

  }



export default NavigationBar;
