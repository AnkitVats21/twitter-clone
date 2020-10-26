import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';

class Login extends Component{
    
    state = { 
    name: "Name",
    email: "Email",
    password : "Password",
    username:"Username",
    confirm_password : "Confirm password",
    emailError: "fine",
    nameError: "fine",
    passwordError : "fine",
    usernameError : "fine",
    confirmError : "fine",
    redirect:null,
    isLoading: false
  }



    render(){

       return(
      
        <div className={classes.wrapbox}>
        <div className={classes.leftbox}>
        </div>

        <div className={classes.rightbox}>
        <form onSubmit = {this.handlesubmit} >
        <h1 className={classes.headline}>SIGN-UP</h1>
        <label className={classes.labelfield}> Name </label>< br/>
    <input  type="text" name="name" className={classes.field} required placeholder={this.state.name}  
    onChange={this.handlechangeall} onBlur={this.validname} onFocus={this.nameclean}/> <br/>
    <p className={(this.state.nameError==="fine")? classes.invisible: classes.visible}>{this.state.nameError}</p>

    <label className={classes.labelfield}> Email </label><br />
    <input  type="email" name="email" className={classes.field} required placeholder= {this.state.email} 
    onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
    <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>

    <label className={classes.labelfield}> Username </label><br />
    <input  type="email" name="email" className={classes.field} required placeholder= {this.state.username} 
    onChange={this.handlechangeall} onBlur={this.validusername} onFocus={this.usernameclean}/> <br/>
    <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.usernameError}</p>

    <label className={classes.labelfield}> Password </label><br />
    <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
    onChange={this.handlechangeall} onBlur={this.validpassword} onFocus={this.passwordclean}/> <br/>
    <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>

    <label className={classes.labelfield}> Confirm Password </label><br />
    <input  type="password" name="confirm_password" className={classes.field} required placeholder= {this.state.confirm_password} 
    onChange={this.handlechangeall}  onBlur={this.validconfirm} onFocus={this.confirmclean}/> <br/>
    <p className={(this.state.confirmError==="fine")? classes.invisible: classes.visible}>{this.state.confirmError}</p>


    <input type="submit" value="Submit" 
    className= {classes.sub}
    /><br/>

    <div className={classes.resign}><Link to='/sign-in' className={classes.linkswitch1}>Already a user? Sign In</Link></div>
    
          </form>
        </div>
        </div>
       )
      }
}


export default Login;