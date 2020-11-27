import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd';
import {withRouter, Redirect} from 'react-router-dom'
import classes from './MainChat.module.css';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {ReactComponent as SearchIcon} from "../../assets/icons/send.svg";

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const token=localStorage.getItem("access_token")
console.log(token)



class MainChat extends Component {

  // client = new W3CWebSocket('ws://6fc246ea7f7e.ngrok.io/ws/chat/'+"17"+ '/' +token+'/')
  client = new W3CWebSocket('ws://84f6e0f316f3.ngrok.io/ws/chat/'+this.props.location.state.chatId+ '/' +token+'/')

  state ={
      userName: '',
      isLoggedIn: true,
      redirect:null,
    messages: []
  }

  onButtonClicked = (value) => {
    this.client.send(JSON.stringify({
      message: value
    }));
    this.setState({ searchVal: '' })
    // this.client.close();
    // this.setState({redirect:'/messages'})
  }

  componentDidMount() {
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer)

      dataFromServer.map(item=>{
        this.setState((state) =>
        ({
          messages: [...state.messages,
          {
            msg: item.content,
            user: item.sender,
            owner: item.owner
          }
        ]
        })
      )
      })

    };
  }


  render() {
    const searchicon= <SearchIcon className={classes.icon}/>

    if(this.state.redirect){
      return <Redirect to= {this.state.redirect} />
    }

    console.log(this.state.messages)
    return (
      <div className={classes.feed}>

        <div className={classes.posthead}>
        <div className={classes.avatar}>
      <Avatar src={this.props.location.state.pic} />
    </div>
    <div className={classes.header}>
        <div className={classes.headerText}>
          <h3>
            {this.props.location.state.name}{" "}
            <span className="post__headerSpecial">
{this.props.verified && <VerifiedUserIcon className={classes.badge} />} <div>@
              {this.props.location.state.username}</div>
            </span>
          </h3>

        </div>

      </div>
      </div>

          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
            {this.state.messages.map(message => 
              // <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: message.owner ? 'flex-end' : 'flex-start' }} loading={false}>
              //   <Meta
              //     title={message.user+":"}
              //     description={message.msg}
              //   />
              // </Card> 
            <p className={message.owner? classes.mymessage : classes.theirmessage}>{message.msg}</p>
            )}
          </div>
          <div className={classes.pseudodiv}></div>
          <div className={classes.bottom}>
            <Search className={classes.inputbar}
              placeholder="Type a message here"
              enterButton={searchicon}
              value={this.state.searchVal}
              size="large"
              onChange={(e) => this.setState({ searchVal: e.target.value })}
              onSearch={value => this.onButtonClicked(value)}
            />
          </div> 


      </div> 



    )
  }
}

export default withRouter(MainChat)