import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';

class Login extends Component{
    
    state = { 
    email: "Email",
    password : "Password",
    emailError: "fine",
    passwordError : "fine",
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
        <h1 className={classes.headline}>SIGN-IN</h1>
        <label className={classes.labelfield}> Email </label><br />
           <input  type="email" name="email" className={classes.field} required placeholder= {this.state.email} 
          onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
          <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>
      
          <label className={classes.labelfield}> Password </label><br />
          <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
          onChange={this.handlechangeall} onBlur={this.validpassword} onFocus={this.passwordclean}/> <br/>
          <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>
      
          <input type="submit" value="Submit" className={classes.sub} /><br/>
          <div className={classes.wraplinks}>
          <span className={classes.linkwrap}><Link to='/forgot-password' className={classes.linkswitch1}>Forgot Password? </Link></span>
          <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span>
          </div>
          </form>
        </div>
        </div>
       )
      }
}


export default Login;