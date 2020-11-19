// import React, { useState, useEffect, Component} from "react";
// import classes from './MainChat.module.css';
// import ServerService from '../../services/ServerService';
// import SearchIcon from "@material-ui/icons/Search";
// import ChatCards from '../UI/Cards/ChatCards/ChatCards'
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// import { Avatar } from "@material-ui/core";

// class MainChat extends Component {

// state={
//   postlist:[]
// }


// render(){

//   return (
//     <div className={classes.feed}>


//       <div className={classes.posthead}>
//           <div className={classes.avatar}>
//             <Avatar src={this.props.avatar} />
//           </div>
//           {/* <div className="post__body"> */}
//             <div className={classes.header}>
//               <div className={classes.headerText}>
//                 <h3>
//                   {this.props.displayName}{" "}
//                   <span className="post__headerSpecial">
//       {this.props.verified && <VerifiedUserIcon className={classes.badge} />} <div>@
//                     {this.props.username}</div>
//                   </span>
//                 </h3>

//               </div>

//             </div>
// </div>


//     </div>
//   );
//         }
// }

// export default MainChat


import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const token=localStorage.getItem("access_token")
console.log(token)
const client = new W3CWebSocket('ws://990c10222b34.ngrok.io/ws/chat/14/'+token+'/');
export default class App extends Component {

  state ={
    userName: '',
    isLoggedIn: true,
    messages: []
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
      message: value
      // msg: value,
      // user: this.state.userName
    }));
    this.setState({ searchVal: '' })
  }
  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.type === "message") {
        this.setState((state) =>
          ({
            messages: [...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user
            }]
          })
        );
      }
    };
  }
  render() {
    return (
      <div className="main" id='wrapper'>
        {this.state.isLoggedIn ?
        <div>
          <div className="title">
            <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Chat: {this.state.userName}</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
            {this.state.messages.map(message => 
              <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
                <Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                  }
                  title={message.user+":"}
                  description={message.msg}
                />
              </Card> 
            )}
          </div>
          <div className="bottom">
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={this.state.searchVal}
              size="large"
              onChange={(e) => this.setState({ searchVal: e.target.value })}
              onSearch={value => this.onButtonClicked(value)}
            />
          </div> 
        </div>
        :
        <div style={{ padding: '200px 40px' }}>
          <Search
            placeholder="Enter Username"
            enterButton="Login"
            size="large"
            onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
          />
        </div>
      }
      </div>
    )
  }
}