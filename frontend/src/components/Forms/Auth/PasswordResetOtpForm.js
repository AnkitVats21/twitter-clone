import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';
import ServerService from '../../../services/ServerService';

class PasswordResetOtpForm extends Component{
    
  state = {   
  // email: localStorage.getItem('email'),
  otp: "otp",
  redirect: null,
  isLoading: false
}


handlechangeall = (event) =>{
  this.setState ( { [event.target.name] :event.target.value  } )
 }


 handlesubmit = (event) => {

  
const data={
  email: localStorage.getItem('useremail'),
  otp: this.state.otp,
  reset:true
}

  event.preventDefault();
console.log(data)
  // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/',data)
  ServerService.resetotp(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      this.setState({isLoading: false});
      this.setState({ redirect: "/change-password" });
    }

    // if (resp.status === 200) {
    //   // localStorage.setItem("token", "abcd");
    //   console.log(resp)
    //   this.createSuccess("Account Created")
    //  const logindata={
    //   email: localStorage.getItem('email'),
    //   password: localStorage.getItem('password'),
    //   }
      
    //   ServerService.login(logindata)
    //   .then((resp)=>{
    //     console.log(resp)
    
    
      
    //   })

     
    // }
  
  })
  .catch(error => {
    console.log(error.response)
    // this.setState({isLoading: false});
    // if(error.response.data.message==="wrong_otp"){
    //   this.createNotification("Wrong OTP")
    // }

  })

 }

 
resend = (event) => {
  
const resenddata={
  email: this.state.email
}
              
  event.preventDefault();
console.log(resenddata)
  // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/resend/',resenddata)
  ServerService.resendotp(resenddata)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      console.log(resp)
      this.createSuccess("OTP sent again")
    }
  
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
      <h1 className={classes.headline}>Enter OTP</h1>

      <label className={classes.labelfield}> OTP </label><br />
    <input  type="number" className={classes.field} name="otp" required placeholder={this.state.otp}  
    onChange={this.handlechangeall}/> <br/>
        <p  className={classes.invisible}>error</p>
  
        <input type="submit" value="Submit" 
    className= {classes.sub}
    /><br/>

        <div className={classes.wraplinks}>
        <span className={classes.linkwrap}><Link to='/forgot-password' className={classes.linkswitch1}>Resend OTP </Link></span>
        {/* <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span> */}
        </div>
        </form>
      </div>
      </div>
     )
    }
}


export default PasswordResetOtpForm;