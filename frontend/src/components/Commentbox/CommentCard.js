import React, { forwardRef } from "react";
import "../Feed/Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { ReactComponent as ChatBubbleOutlineIcon } from "../../assets/icons/Comment.svg";
import { ReactComponent as RepeatIcon } from "../../assets/icons/Retweet.svg";
import { ReactComponent as FavoriteBorderIcon } from "../../assets/icons/Heart.svg";
import LikeButton from "../UI/LikeButton/LikeButton"
import BookmarkButton from "../UI/BookmarkButton/BookmarkButton"
import { ReactComponent as PublishIcon } from "../../assets/icons/Bookmark.svg";
import Highlighter from "react-highlight-words";


const CommentCard = forwardRef(
    ({ displayName, username, verified, text, image, avatar }, ref) => {

      const Highlight = ({ children, highlightIndex }) => (
        <strong className="highlighted-text">{children}</strong>
      );

      return (
        <div className="commpost" ref={ref}>
          <div className="posthead">
          <div className="post__avatar">
            <Avatar src={avatar} />
          </div>
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
                {/* <p>{text}</p> */}
                <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={[/\B\@([\w\-]+)/gim, /#[A-Za-z0-9]*/g]}
    highlightTag ={Highlight}
    textToHighlight={text}
    // textToHighlight={props.text}
  />
              </div> 
              <div  className="imgwrap">
            {image? <img className="foodimg" src={image} alt="" />: null}
            </div>
          </div>

      );
    }
  );
  
  export default CommentCard;