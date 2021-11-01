import React, { useState, useEffect, Component} from "react";
import classes from './ChatList.module.css';
import ServerService from '../../services/ServerService';
import SearchIcon from "@material-ui/icons/Search";
import ChatCards from '../UI/Cards/ChatCards/ChatCards'
import MenuIcon from '@material-ui/icons/Menu';
import Loader from 'react-loader-spinner'

class ChatList extends Component {

state={
  chatlist:[],
  isloading: true
}

componentDidMount(){
  ServerService.recentchats()
  .then(response=>{
    console.log(response);
    this.setState({chatlist: response.data, isloading:false})
  })
}



render(){

  if(this.state.isloading){
    return  (
      <div>
    <Loader
    type="TailSpin"
    color="#657EFF"
    height={100}
    width={100}
    className="commentspinner"
 />
 </div>
 );
  }

  else{

  const chatlist= this.state.chatlist.map(postlist=>{
    return <ChatCards 
    key={postlist.id}
    displayName={postlist.r_name}
      username={postlist.r_username}
      avatar={postlist.profile_pic}
      chatId={postlist.id}
    /> 
    })
      

  return (
    <div className={classes.feed}>
      <MenuIcon class="hamburgericon"/>
      <div className="feed__header messageheader">
        <h2>Messages</h2>
      </div>

      <div className={classes.widgetsinput}>
        <input className={classes.widgetssearchbar} placeholder="Search For People" type="text" />
        <SearchIcon className={classes.widgetssearchIcon} />
      </div>

      {chatlist}

    </div>
  );


  }


  }
}





export default ChatList