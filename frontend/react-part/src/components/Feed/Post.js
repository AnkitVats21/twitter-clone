import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// import ChatBubbleOutlineIcon from "../../assets/icons/Vector.svg";
import { ReactComponent as ChatBubbleOutlineIcon } from "../../assets/icons/Comment.svg";
import { ReactComponent as RepeatIcon } from "../../assets/icons/Retweet.svg";
import { ReactComponent as FavoriteBorderIcon } from "../../assets/icons/Heart.svg";
import LikeButton from "../UI/LikeButton/LikeButton"
import BookmarkButton from "../UI/BookmarkButton/BookmarkButton"
import { ReactComponent as PublishIcon } from "../../assets/icons/Bookmark.svg";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import FavoriteBorderIcon from "@material-ui/icons/Heart.svg";
// import  from "@material-ui/icons/Publish";

const Post = forwardRef(
    ({ displayName, username, verified, text, image, avatar }, ref) => {
      return (
        <div className="post" ref={ref}>
          <div className="posthead">
          <div className="post__avatar">
            <Avatar src={avatar} />
          </div>
          {/* <div className="post__body"> */}
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {displayName}{" "}
                  <span className="post__headerSpecial">
      {verified && <VerifiedUserIcon className="post__badge" />} <div>@
                    {username}</div>
                  </span>
                </h3>
              </div>
              {/* */}
            </div>
            </div>
            <div className="post__headerDescription">
                <p>{text}</p>
              </div> 
              <div  className="imgwrap">
            {image? <img className="foodimg" src={image} alt="" />: null}
            </div>
            <div className="post__footer">
              <div><ChatBubbleOutlineIcon /><span className="peoplecount">12</span></div>
              {/* <div><FavoriteBorderIcon /><span className="peoplecount">12</span></div> */}
              <LikeButton />
              <div><RepeatIcon /><span className="peoplecount">12</span></div>
              {/* <div><PublishIcon /><span className="peoplecount">12</span></div> */}
              <BookmarkButton />
            </div>
          </div>
        //  </div>
      );
    }
  );
  
  export default Post;