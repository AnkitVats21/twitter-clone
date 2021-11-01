import React, { Component } from "react";
import "../Feed/Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { ReactComponent as ChatBubbleOutlineIcon } from "../../assets/icons/Comment.svg";
import { ReactComponent as RepeatIcon } from "../../assets/icons/Retweet.svg";
import { ReactComponent as FavoriteBorderIcon } from "../../assets/icons/Heart.svg";
import LikeButton from "../UI/LikeButton/LikeButton"
import BookmarkButton from "../UI/BookmarkButton/BookmarkButton"
import { ReactComponent as PublishIcon } from "../../assets/icons/Bookmark.svg";

      class ReplyCard extends Component{
        // state={
        //   replyshow:true
        // }
        
        showreply=()=>{
        this.setState({replyshow:false})
        }

        render(){
          console.log(this.props.replies)
      return (
        <div className="card replycard">
          {/* <div className="posthead"> */}
          {/* <div className="dpdiv"> */}
          <div className="commtavatar">
            <Avatar src={this.props.avatar} />
            </div>
            <div>
          <div className="commtdiv">{this.props.displayName} <span className="commuser">@{this.props.username} </span></div>
          <p>{this.props.text} </p>

          {/* {this.state.replyshow? <div className="repbtn" onClick={this.showreply}>Reply</div>: <div className="commtwrap"><input className="commtreply" /> <button className="addreplybtn">Reply</button></div>} */}

          </div>

        </div>
      );
        }
      }
  
  export default ReplyCard;