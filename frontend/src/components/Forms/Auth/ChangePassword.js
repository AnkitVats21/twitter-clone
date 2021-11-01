import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';
import ServerService from '../../../services/ServerService';

class ChangePassword extends Component{
    
  state = {   
  // email: localStorage.getItem('email'),
  password: "",
  confirm: "",
  redirect: null,
  isLoading: false
}


handlechangeall = (event) =>{
  this.setState ( { [event.target.name] :event.target.value  } )
 }


 handlesubmit = (event) => {

  
const data={
  email: localStorage.getItem('useremail'),
  password: this.state.password
}

  event.preventDefault();
console.log(data)
  // axios.post('https://776d58591d10.ngrok.io/auth/register/otp/',data)
  ServerService.resetpass(data)
  .then((resp)=>{
    console.log(resp)

    if (resp.status === 200) {
      this.setState({isLoading: false});
      localStorage.setItem("refresh_token",resp.data.refresh)
      localStorage.setItem("access_token",resp.data.access)
      this.setState({ redirect: "/" });
    }

      
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
      <h1 className={classes.headline}>Reset Password</h1>

      <label className={classes.labelfield}> New Password </label><br />
    <input  type="password" className={classes.field} name="password" required placeholder={this.state.password}  
    onChange={this.handlechangeall}/> <br/>
        <p  className={classes.invisible}>error</p>

      <label className={classes.labelfield}> Confirm Password </label><br />
    <input  type="password" className={classes.field} name="confirm" required placeholder={this.state.confirm}  
    onChange={this.handlechangeall}/> <br/>
        <p  className={classes.invisible}>error</p>
  
        <input type="submit" value="Submit" 
    className= {classes.sub}
    /><br/>

        {/* <div className={classes.wraplinks}> */}
        {/* <span className={classes.linkwrap}><Link to='/forgot-password' className={classes.linkswitch1}>Resend OTP </Link></span> */}
        {/* <span className={classes.linkwrap}><Link to='/sign-up' className={classes.linkswitch2}>Sign up </Link></span> */}
        {/* </div> */}
        </form>
      </div>
      </div>
     )
    }
}


export default ChangePassword;