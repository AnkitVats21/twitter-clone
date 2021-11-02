import React, { Component } from "react";
import Post from "./Post";
import "./Feed.css";
import MenuIcon from '@material-ui/icons/Menu';
import ServerService from '../../services/ServerService';

import { connect } from 'react-redux';
// import { asyncAddPost } from '../../redux/actions/Homeposts';

class Feed extends Component {

  state = {
    postlist: []
  }

  deletepost = (index, tweetid) => {
    //   console.log(index)
    // console.log(tweetid)
    let oldItems = this.state.postlist;
    oldItems.splice(index, 1);
    this.setState({ postlist: oldItems });

    ServerService.deletepost(tweetid)
      .then(response => {
        console.log(response);
      })

  }

  componentDidMount() {
    // ServerService.homecards()
    // .then(response=>{
    //   console.log(response);
    //   this.setState({postlist: response.data})
    // })
    this.props.ShowHomePosts()

  }

  render() {
    let postlist = null
    let { home } = this.props
    if (home)
      console.log(home.home)
    if (home) {
      postlist = home.home.map((postlist, index) => {
        return <Post image={postlist.photos} retweeted={postlist.retweeted} isowned={postlist.owner}
          deletepost={this.deletepost} postindex={index} likes={postlist.likes} comments={postlist.TotalComments}
          isliked={postlist.liked} isbookmarked={postlist.bookmarked} key={postlist.id} id={postlist.id} user={postlist.user_id}
          displayName={postlist.name} username={postlist.username} text={postlist.text} avatar={postlist.profile_pic}
          rtweet={postlist} retweetcount={postlist.retweets}
        />
      })

    }
    return (
      <div className="feed">
        <MenuIcon class="hamburgericon" />
        <div className="feed__header">
          <h2 onClick={() => this.state.postlist.splice(0, 1)}>Home</h2>
        </div>

        {postlist}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
})

const mapDispatchToProps = dispatch => {

  return {
    // ShowHomePosts: () => dispatch(asyncAddPost())
    // sort: (a,b,c,d)  => dispatch(sort(a,b,c,d)),
  }


}

// export default Feed;

export default connect(mapStateToProps, mapDispatchToProps)(Feed);