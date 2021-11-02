import React, { Component } from "react";
import "../Feed/Post.css";
import { Avatar } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import ReplyCards from './ReplyCards'
import ServerService from '../../services/ServerService';
import { NotificationManager } from 'react-notifications';

class CommentCard extends Component {
  state = {
    replyshow: true,
    postlist: this.props.replies,
    postid: this.props.postid,
    commentid: this.props.commentid,
    redirect: null,
    reply: ""
  }

  showreply = () => {
    this.setState({ replyshow: false })
  }

  createSuccess = (info) => {
    NotificationManager.success(info, '');
  };

  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  replyHandler = () => {

    const data = {
      text: this.state.reply,
      replying_to_tweet: this.state.postid,
      replying_to_comment: this.state.commentid,
      // replying_to_tweet: this.state.postlist.id
    }

    console.log(data)

    this.setState({ replyshow: true })

    ServerService.addreply(data)
      .then(response => {
        console.log(response);
        this.createSuccess("Your reply has been added")
        this.setState({ redirect: '/' })
      })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const postlist = this.state.postlist.map((postlist, index) => {
      return <ReplyCards image={postlist.photos} replies={postlist.reply}
        key={postlist.id} displayName={postlist.name}
        username={postlist.username} text={postlist.text}
        avatar={postlist.profile_pic}
      />
    })

    console.log(this.state)
    return (
      <>
        <div className="card comment">
          {/* <div className="posthead"> */}
          {/* <div className="dpdiv"> */}
          <div className="commtavatar">
            <Avatar src={this.props.avatar} />
          </div>
          <div>
            <div className="commtdiv">{this.props.displayName} <span className="commuser">@{this.props.username}</span></div>
            <p>{this.props.text} </p>

            {this.state.replyshow ? <div className="repbtn" onClick={this.showreply}>Reply</div> : <div className="commtwrap"><input onChange={this.handlechangeall} name="reply" className="commtreply" /> <button onClick={this.replyHandler} className="addreplybtn">Reply</button></div>}

          </div>
        </div>
        {postlist}
      </>
    );
  }
}

export default CommentCard;