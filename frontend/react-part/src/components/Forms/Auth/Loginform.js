import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';
import ServerService from '../../../services/ServerService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import LoadingOverlay from 'react-loading-overlay';

const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

const validPasswordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);

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

   createNotification = (info) => {

    NotificationManager.error( info, '');
  
  
  };

  validemail=()=>{

    if(!validEmailRegex.test(this.state.email)){
      this.setState({emailError:"Invalid email"})
    }
  
    else{
      return true
    }
   
  }
  
  validpassword=()=>{
  
    if(!validPasswordRegex.test(this.state.password)){
      this.setState({passwordError:"Invalid password"})
    }
  
    else{
      return true
    }
  
  }
  
  
  emailclean=()=>{
    this.setState({emailError:"fine"})
  }
  
  passwordclean=()=>{
    this.setState({passwordError:"fine"})
  }

  
   handlesubmit = (event) => {
     console.log("hello world")


        const data={
          email: this.state.email,
          password: this.state.password
        }
             
      event.preventDefault();
    
      console.log(data);
    
    ServerService.login(data)
    .then((resp)=>{
      console.log(resp)

      if (resp.status === 200) {
        localStorage.setItem("refresh_token",resp.data.refresh)
        localStorage.setItem("access_token",resp.data.access)
        this.setState({isLoading: false});
        this.setState({ redirect: "/" });
        // console.log(resp.data.refresh)
      }
    
      // if (resp.data.message === "otp_sent") {
      //   this.createSuccess("OTP sent to the mail")
      //   localStorage.setItem('email', this.state.email)
      //   localStorage.setItem('password', this.state.password)
      //   this.setState({isLoading: false});
      //   this.setState({ redirect: "/otp" });
      // }
    
    })
    .catch(err => {
      console.log(err.response)
      // this.setState({isLoading: false})
      // if(err.response.data.message){
      this.createNotification("Seems like the information entered is incorrect. Please check your information")
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
        <h1 className={classes.headline}>Welcome Back!</h1>
        <label className={classes.labelfield}> Email </label><br />
           <input name="email" className={classes.field} required placeholder= {this.state.email} 
          onChange={this.handlechangeall} onBlur={this.validemail} onFocus={this.emailclean}/> <br/>
          <p  className={(this.state.emailError==="fine")? classes.invisible: classes.visible}>{this.state.emailError}</p>
      
          <label className={classes.labelfield}> Password </label><br />
          <input  type="password" name="password" className={classes.field} required placeholder= {this.state.password} 
          onChange={this.handlechangeall} /> <br/>
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