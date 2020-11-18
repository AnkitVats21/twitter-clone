import React, { forwardRef } from "react";
import {Link} from 'react-router-dom';
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { ReactComponent as ChatBubbleOutlineIcon } from "../../assets/icons/Comment.svg";
import { ReactComponent as RepeatIcon } from "../../assets/icons/Retweet.svg";
import { ReactComponent as FavoriteBorderIcon } from "../../assets/icons/Heart.svg";
import LikeButton from "../UI/LikeButton/LikeButton"
import BookmarkButton from "../UI/BookmarkButton/BookmarkButton"
import { ReactComponent as PublishIcon } from "../../assets/icons/Bookmark.svg";
// import PostModal from'../UI/PostModal/PostModal';
import RetweetModal from'../UI/RetweetModal/RetweetModal';
import {DropdownButton, Dropdown} from 'react-bootstrap'

const Post = (
    (props) => {
    // ({ displayName, username, likes, isliked, isbookmarked, verified, text, image, avatar, id} ) => {
      const [modalShow, setModalShow] = React.useState(false);
      return (
        <div className="post">
          <div className="postheadwrap">
          <div className="posthead">
          <div className="post__avatar">
            <Avatar src={props.avatar} />
          </div>
          {/* <div className="post__body"> */}
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {props.displayName}{" "}
                  <span className="post__headerSpecial">
      {props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
                    {props.username}</div>
                  </span>
                </h3>
              </div>
              </div>

            </div>
            {/*  */}
            <DropdownButton id="dropdown-item-button" title="">
  {/* <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText> */}
  <Dropdown.Item as="button">Edit</Dropdown.Item>
  <Dropdown.Item as="button">Delete</Dropdown.Item>
  {/* <Dropdown.Item as="button">Something else</Dropdown.Item> */}
</DropdownButton>
            </div>
            <div className="post__headerDescription">
                <p>{props.text}</p>
              </div> 
              <div  className="imgwrap">
            {props.image? <img className="foodimg" src={props.image} alt="" />: null}
            </div>
            <div className="post__footer">
              <Link className="post__commt" 
              to= {{
                pathname:'/comments',
                state:{tweetid: props.id}
              }}
              ><div><ChatBubbleOutlineIcon /><span className="peoplecount">{props.comments}</span></div></Link>
              {/* <div><FavoriteBorderIcon /><span className="peoplecount">12</span></div> */}
              {/* <LikeButton /> */}
              <LikeButton 
                pk={props.id} 
                likeis= {props.isliked} 
                points= {props.likes} 
                />
              <div onClick={() => setModalShow(true)}><RepeatIcon /><span className="peoplecount">12</span></div>
              {/* <div><PublishIcon /><span className="peoplecount">12</span></div> */}
              <BookmarkButton pk={props.id} 
              bookmarkedis= {props.isbookmarked} 
              />

        <RetweetModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        avatar={props.avatar}
        username={props.username} text={props.text} 
        image={props.image} 
        name={props.displayName}
        key={props.id} displayName={props.name} 
      />
            </div>
          </div>
        //  </div>
      );
    }
  );
  
  export default Post;