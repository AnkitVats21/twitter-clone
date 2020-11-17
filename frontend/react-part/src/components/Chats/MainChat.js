import React, { useState, useEffect, Component} from "react";
import classes from './MainChat.module.css';
import ServerService from '../../services/ServerService';
import SearchIcon from "@material-ui/icons/Search";
import ChatCards from '../UI/Cards/ChatCards/ChatCards'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Avatar } from "@material-ui/core";

class MainChat extends Component {
//   const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   ServerService.homecards()
  // .then(response=>{
  //   console.log(response);
  //   // this.setState({recipecards: response.data, isLoading:false})
  // })
  // }, []);

state={
  postlist:[]
}

componentDidMount(){
  // axios.get('https://60bb5774f441.ngrok.io/')
//   .then(response=>{
//     console.log(response);
//     this.setState({postlist: response.data})
//   })
}

render(){

  return (
    <div className={classes.feed}>


      <div className={classes.posthead}>
          <div className={classes.avatar}>
            <Avatar src={this.props.avatar} />
          </div>
          {/* <div className="post__body"> */}
            <div className={classes.header}>
              <div className={classes.headerText}>
                <h3>
                  {this.props.displayName}{" "}
                  <span className="post__headerSpecial">
      {this.props.verified && <VerifiedUserIcon className={classes.badge} />} <div>@
                    {this.props.username}</div>
                  </span>
                </h3>

              </div>

            </div>
</div>

{/* <div className={classes.widgetsinput}>
        <SearchIcon className={classes.widgetssearchIcon} />
        <input className={classes.widgetssearchbar} placeholder="Search Twitter" type="text" />
      </div> */}

    </div>
  );
        }
}

export default MainChat