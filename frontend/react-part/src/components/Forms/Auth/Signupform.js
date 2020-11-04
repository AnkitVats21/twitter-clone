import React, { Component } from 'react';
import classes from './Loginform.module.css';
import {Link, Redirect} from 'react-router-dom';
import ServerService from '../../../services/ServerService';

const validEmailRegex = RegExp(
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
);

const validPasswordRegex = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
);


const validNameRegex = RegExp(
  /^[a-zA-Z ]*$/
);

const validUsernameRegex = RegExp(
  /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
);


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


  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
   }
   
   
  //  createNotification = (info) => {
  //    NotificationManager.error( info, 'Error');
  //  };
   
  //  createSuccess = (info) => {
  //    NotificationManager.success( info, 'Success');
  //  };
   
   validemail=()=>{
   
     if(!validEmailRegex.test(this.state.email)){
       this.setState({emailError:"Invalid email"})
     }
   
     else{
       return true
     }
    
   }
   
   validconfirm=()=>{
   
     if(this.state.password!=this.state.confirm_password){
       this.setState({confirmError:"Passwords do not match"})
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
   
   validname=()=>{
   
     if(!validNameRegex.test(this.state.name)){
       this.setState({nameError:"Invalid name"})
     }
   
     else{
       return true
     }
   
   }
   
   validusername=()=>{
   
     if(!validUsernameRegex.test(this.state.username)){
       this.setState({usernameError:"Invalid username"})
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
   
   nameclean=()=>{
     this.setState({nameError:"fine"})
   }
   
   usernameclean=()=>{
     this.setState({usernameError:"fine"})
   }
   
   confirmclean=()=>{
     this.setState({confirmError:"fine"})
   }


   handlesubmit = (event) => {

    if(
      this.state.emailError!=='fine' ||
      this.state.nameError!=='fine' ||
      this.state.passwordError!=='fine' ||
      this.state.confirmError!=='fine' 
    ){
      event.preventDefault();
      // this.createNotification("Please Check your entered information")
    }
    
    else{
    
        this.setState({ isLoading: true });
    
        const data={
          profile: {name: this.state.name},
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          confirm_password: this.state.confirm_password
        }
             
      event.preventDefault();
    
      console.log(data);
    
    ServerService.signup(data)
    .then((resp)=>{
      console.log(resp)
    
      if(resp.status===201){
        console.log('otp sent')
        //   this.createSuccess("OTP sent to the mail")
        this.setState({ redirect: "/otp" });
        localStorage.setItem('email', this.state.email)
        localStorage.setItem('password', this.state.password)
      }

    
    })
    .catch(err => {
      console.log(err.response)
      // this.setState({isLoading: false})
      // if(err.response.data.message){
      // this.createNotification(err.response.data.message)
      // }
    })
    
    }
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
    <input  type="text" name="username" className={classes.field} required placeholder= {this.state.username} 
    onChange={this.handlechangeall} onBlur={this.validusername} onFocus={this.usernameclean}/> <br/>
    <p  className={(this.state.usernameError==="fine")? classes.invisible: classes.visible}>{this.state.usernameError}</p>

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