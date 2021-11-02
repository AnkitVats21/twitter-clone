import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import CommentCard from "./CommentCard";
import CommentCards from "./CommentCards";
import "./Commentbox.css";
import { Button } from 'react-bootstrap'
import ServerService from '../../services/ServerService';
import { NotificationManager } from 'react-notifications';

import Loader from 'react-loader-spinner'

class Commentbox extends Component {

  state = {
    postlist: [],
    commentlist: [],
    num: "",
    comment: "",
    redirect: null,
    isloading: true
  }

  handlechangeall = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createSuccess = (info) => {
    NotificationManager.success(info, '');
  };

  componentDidMount() {
    // ServerService.homecards()
    const data = this.props.location.state.tweetid;
    ServerService.postcomment(data)
      .then(response => {
        console.log(response);
        this.setState({ postlist: response.data, commentlist: response.data.comments, isloading: false })
      })
  }

  commentHandler = () => {

    const data = {
      text: this.state.comment,
      replying_to_tweet: this.state.postlist.id
    }

    console.log(data)


    ServerService.addcomment(data)
      .then(response => {
        console.log(response);
        this.createSuccess("Your comment has been added")
        this.setState({ redirect: '/' })
      })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const commentlist = this.state.commentlist.map(postlist => {
      return <CommentCards image={postlist.photos} replies={postlist.reply} postid={this.state.postlist.id}
        key={postlist.id} displayName={postlist.name} commentid={postlist.id}
        username={postlist.username} text={postlist.text}
        avatar={postlist.profile_pic} />
    })

    console.log(this.state.commentlist)

    if (this.state.isloading) {
      return (
        <div className="feed">
          <Loader
            type="TailSpin"
            color="#657EFF"
            height={100}
            width={100}
            className="profilespinner"
          />
        </div>
      );
    }

    else {
      return (
        <div className="feed">
          <div className="feed__header">
            <h2>Post</h2>
          </div>

          <CommentCard
            key="hi"
            displayName={this.state.postlist.name}
            username={this.state.postlist.username}
            verified="true"
            id={this.state.postlist.id}
            likes={this.state.postlist.likes}
            comments={this.state.postlist.TotalComments}
            isliked={this.state.postlist.liked}
            isbookmarked={this.state.postlist.bookmarked}
            text={this.state.postlist.text}
            avatar={this.state.postlist.profile_pic}
            image={this.state.postlist.photos}

          />

          <div className="feed__header commheader">
            <h2>Comments</h2>
          </div>
          {commentlist}

          <div className="inputcommdiv"><input onChange={this.handlechangeall} name="comment" className="commentfield" />
            <Button className="commentbtn" onClick={this.commentHandler}>Comment</Button></div>

        </div>
      );
    }
  }
}

export default withRouter(Commentbox);