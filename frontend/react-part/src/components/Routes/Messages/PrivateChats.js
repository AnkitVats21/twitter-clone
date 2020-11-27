import React, { Component } from 'react';
import classes from '../Home/Home.module.css';
import Sidebar from '../../Sidebar/Sidebar'
import Widgets from '../../Widgets/Widgets'
import ChatList from '../../Chats/ChatList'
import MainChat from '../../../components/Chats/MainChat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class PrivateChats extends Component {

  
    render() {
      return(
      <div className={classes.flexbox}>
                <Sidebar propactive="messages" />
<MainChat />
        {/* <Router>
        <ChatList />

        <Switch>

<Route path='/messages' exact>
  <Widgets />
  </Route>
<Route path='/messages/chat/:chatId'>
  <MainChat />
  </Route>

</Switch>
</Router> */}
<Widgets />
      </div>
      )
    }
  }
  
  
  export default PrivateChats;
  
  