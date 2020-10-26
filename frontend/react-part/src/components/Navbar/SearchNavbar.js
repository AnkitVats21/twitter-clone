import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './Navbar.module.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import ServerService from '../../services/serverService'

class SearchNavbar extends Component{

  state = { 
    search:"",
    redirect:null,
    recipecards:""
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
  }

  handlesubmit=(event)=>{

        const data={
            search: this.state.search,
            redirect:"/search-page" 
          }
        
          console.log(data)
          // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
          ServerService.searchpage(data)
          .then((resp)=>{
            console.log(resp);
            // const search_res=resp.data
            // console.log(search_res);
            if (resp.status === 200) {
                this.setState({recipecards: resp.data})
                console.log(this.state.recipecards)
            }
          
          })
   
    // axios.post('https://b841ca4ed474.ngrok.io/search/',data)
    // ServerService.searchbox(data)
    // .then((resp)=>{
      // console.log(resp.data);
      // const search_res=resp.data
      // console.log(search_res);
      // if (resp.status === 200) {
        // localStorage.setItem("token", "abcd");
        // localStorage.setItem("search_result",resp.data)
        // localStorage.setItem("access_token",resp.data.access)
        
    //   }
    
    // })
  
  
  }
  

  //   axios.post('https://60bb5774f441.ngrok.io/search/',data)
  //   .then((resp)=>{
  //     console.log(resp)
  // }}




  render() {

    if(this.state.redirect){
        return <Redirect to= {{
          pathname:this.state.redirect,
          state:{aterm: this.state.search}
        }} />
      }

    let token= localStorage.getItem('refresh_token');
      let auth= true;
      if(token===null){
      auth=false;
      }

      const logoutHandler=()=>{
        localStorage.clear();
        auth= false;
      }

      if(auth){
        return(
          <Navbar bg="light" expand="lg" sticky="top" className={classes.navshadow}>
            <Link className={classes.brand} to="/">Foodex</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            {/* <Form inline className="ml-auto"> 
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form> */}
              <Nav className="ml-auto" >
                <NavDropdown title="Categories" className={classes.navoption} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} className={classes.dditems} to="/starters">Starters</NavDropdown.Item>
                <NavDropdown.Item as={Link} className={classes.dditems} to="/main-course">Main Course</NavDropdown.Item>
                <NavDropdown.Item as={Link} className={classes.dditems} to="/desserts">Desserts</NavDropdown.Item>
                <NavDropdown.Item as={Link} className={classes.dditems} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
                <NavDropdown.Item as={Link} className={classes.dditems} to="/others">Others</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} className={classes.logopt} to="/add-recipe"><i class="fa fa-edit" aria-hidden="true"></i>Post</Nav.Link>
                <Nav.Link as={Link} className={classes.logopt} to="/profile"><i className="fa fa-user" aria-hidden="true"></i>My Profile</Nav.Link>
                <Nav.Link as={Link} className={classes.navoptions} to="/" onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
        );
        
      }


      else{
      return(
<Navbar bg="light" expand="lg" sticky="top">
  <Link className={classes.brand} to="/">Foodex</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  {/* <Form inline className="ml-auto"> 
                <FormControl type="text" name="search" onChange={this.handlechangeall} placeholder="Search" className={classes.sbar}
                
                />
                <Button onClick={this.handlesubmit} className={classes.sbtn} variant="outline-dark" ><i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form> */}
    <Nav className="ml-auto">
      <NavDropdown title="Categories" className={classes.navoption} id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} className={classes.dditems} to="/starters">Starters</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/main-course">Main Course</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/desserts">Desserts</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/drinks-smoothies">Drinks and Smoothies</NavDropdown.Item>
      <NavDropdown.Item as={Link} className={classes.dditems} to="/others">Others</NavDropdown.Item>


      </NavDropdown>
      <Nav.Link as={Link} className={classes.navoptions} to="/sign-in">Sign In</Nav.Link>
      <Nav.Link as={Link} className={classes.navoptions} to="/sign-up">Sign Up</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
      );
}




  }
}


export default SearchNavbar;
