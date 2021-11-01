import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';
import ServerService from '../../../services/ServerService';

class Login extends Component{
    
    state = { 
    email: "Email",
    password : "Password",
    emailError: "fine",
    passwordError : "fine",
    redirect:null,
    isLoading: false
  }

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
   }

  
   handlesubmit = (event) => {
     console.log("hello world")


        const data={
          email: this.state.email
        }
             
      event.preventDefault();
    
      console.log(data);
    
    ServerService.forgotpassword(data)
    .then((resp)=>{
      console.log(resp)

      if (resp.status === 200) {
        this.setState({isLoading: false});
        this.setState({ redirect: "/password-reset-otp" });
      }
    
      // if (resp.data.message === "otp_sent") {
      //   this.createSuccess("OTP sent to the mail")
        localStorage.setItem('useremail', this.state.email)
      //   localStorage.setItem('password', this.state.password)
      //   this.setState({isLoading: false});
      //   this.setState({ redirect: "/otp" });
      // }
    
    })
    .catch(err => {
      console.log(err.response)
      // this.setState({isLoading: false})
      // if(err.response.data.message){
      // this.createNotification(err.response.data.message)
      // }
    })
    
    
     }

    render(){

      if(this.state.redirect){
        return <Redirect to= {this.state.redirect} />
      }

       return(
      
        <div className={classes.wrapbox}>
        <div className={classes.leftbox}>
        </div>

        <div className={classes.rightbox}>
        <form onSubmit = {this.handlesubmit} >
        <h1 className={classes.headline}>Enter Email</h1>

        <label className={classes.labelfield}> Email </label><br />
           <input name="email" className={classes.field} required placeholder= {this.state.email} 
          onChange={this.handlechangeall} /> <br/>
          <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>
      
          {/* <label className={classes.labelfield}> Password </label><br />
          <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
          onChange={this.handlechangeall} /> <br/>
          <p className={(this.state.passwordError==="fine")? classes.invisible: classes.visible}>{this.state.passwordError}</p>
      */}
          <input type="submit" value="Submit" className={classes.sub} /><br/>
          <div className={classes.wraplinks}>
          {/* <span className={classes.linkwrap}><Link to='/forgot-password' className={classes.linkswitch1}>Forgot Password? </Link></span>
          <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span> */}
          </div> 
          </form>
        </div>
        </div>
       )
      }
}


export default Login;