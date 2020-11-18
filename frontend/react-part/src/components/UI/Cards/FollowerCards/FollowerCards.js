import React, { Component } from "react";
import classes from "./FollowerCards.module.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Avatar } from "@material-ui/core";
import { Button } from "react-bootstrap";

class FollowerCards extends Component {
    // ({ displayName, username, verified,avatar, isfollow }, ref) => {

      state={
        isfollow:this.props.isfollow

    }

      handlefollow=()=>{
        console.log(this.state.follow)
        if(this.state.isfollow){
            this.setState({isfollow:false})
        }
        else{
            this.setState({isfollow:true})
        }
    
        // const data={
        //     userpk: this.state.userdetails.id
        // }
    
        // serverService.followtoggle(data)
        // .then((resp)=>{
        //     console.log(resp)          
        //   })
    }

    render(){
      return (
        <div className={classes.post}>
          
          <div className={classes.headwrap}>
<div className={classes.posthead}>
          <div className={classes.followavatar}>
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
<div className={classes.btnwrap}>
            {this.state.isfollow?<Button onClick={this.handlefollow} className={classes.btn}>Unfollow</Button>:
            <Button onClick={this.handlefollow} className={classes.btn}>Follow</Button>}
            </div>
            </div>
            </div>
      );
    }
   
  }
  export default FollowerCards;