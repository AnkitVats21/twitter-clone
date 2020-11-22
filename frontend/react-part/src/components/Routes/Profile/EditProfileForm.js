import React, { useState, useEffect, Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios'
import ServerService from "../../../services/ServerService";
// import Post from '../Feed/Post'
// import ServerService from'../../services/ServerService'

class EditProfileForm extends Component{

//   state={
//     userdetails:[],
//     profiledet:[],
//     connect:[]
//   }

state={
    name:this.props.name,
    bio:this.props.bio,
    cover_pic: this.props.cover_pic,
    picture: this.props.picture,
    profilepic:null,
    coverimg: false,
    redirect:null

}

  handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
  }

  // handleimg=(e)=>{
  //   this.setState({picture:e.target.files[0]})
  // }

  handleimg=(e)=>{
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({picture: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])

    this.setState({profilepic:e.target.files[0]})
  }

  handlecover=(e)=>{
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        this.setState({cover_pic: reader.result})
      }
    }
    reader.readAsDataURL(e.target.files[0])

    this.setState({coverimg:e.target.files[0]})
  }



  edithandler=()=>{
    let data={
      hi:"hi"
    }

    if(this.state.coverimg){
      if(this.state.profilepic){
        data={
          name: this.state.name,
           bio: this.state.bio,
           cover_pic: this.state.coverimg,
           picture: this.state.profilepic
       }
      }
      else{
        data={
          name: this.state.name,
          bio: this.state.bio,
          cover_pic: this.state.coverimg
       }
      }
    }
    else{
      if(this.state.profilepic){
        data={
          name: this.state.name,
          bio: this.state.bio,
          picture: this.state.profilepic
       }
      }
      else{
        data={
          name: this.state.name,
          bio: this.state.bio
       }
      }
    }


       const formdata = new FormData();
for (let formElement in data) {
  formdata.append(formElement, data[formElement]);
  console.log(formElement, data[formElement]);
}

// axios.patch( 'http://fa067537cf22.ngrok.io/api/updateprofile/' ,formdata,
//         {
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//           }
          
//       })

      ServerService.editprofilebtn(formdata)
      .then(response=>{
        console.log(response);
      })

       console.log(data)
       this.setState({redirect:'/profile'})
   }


//   componentDidMount(){
//     // axios.get('https://60bb5774f441.ngrok.io/')
//     ServerService.userdetails()
//     .then(response=>{
//       console.log(response.data);
//       this.setState({userdetails: response.data, profiledet: response.data.profile, connect: response.data.connections})
//     })
//   }

  render(){

    if(this.state.redirect){
      return <Redirect to= {this.state.redirect} />
    }

  return (
<div className="feed">
<div className="feed__header">
<h2>Edit Profile</h2>
</div>

<div className="profilewrap">

<input onChange={this.handleimg} className="hidden" id="editdp" type="file" name="file" />
<input onChange={this.handlecover} className="hidden" id="editcover" type="file" name="file" />

<div className="coverimg" style={{  
backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(" + this.state.cover_pic + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>

<label htmlFor="editdp"><img className="profileimg" src={this.state.picture} /></label>
<label className="cameraicon" htmlFor="editcover"><CameraAltIcon /></label>
</div>
{/* </label> */}
  
<div className="editprofiledetails">
    <div>
    <br/>
<label className="labelfield"> Name </label><br />
           <input name="name" value={this.state.name} className="field" 
          onChange={this.handlechangeall} /> <br/>
          <br/>
<label className="labelfield"> Bio </label><br />
           <textarea rows="6" value={this.state.bio} name="bio" className="field" 
          onChange={this.handlechangeall} /> <br/>
          {/* <br/> */}
          <br/>
          </div>
<div className="editbtnwrap">
          <button onClick={this.edithandler} className="editprofile">
            {/* <Link 
to= {{
  pathname:'/profile',
}}
className="editprofiletext"> */}
  Save Details
{/* </Link> */}
</button>

</div>
<br/>
</div>


</div>
</div>

  )
}
}

export default EditProfileForm;