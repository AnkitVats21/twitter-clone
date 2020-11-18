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
import EditPostModal from'../UI/EditPostModal/EditPostModal';
import {DropdownButton, Dropdown} from 'react-bootstrap'

import Highlighter from "react-highlight-words";

const validusername = RegExp(
  /^(?!.*\bRT\b)(?:.+\s)?@\w+/i
);

const Post = (


    (props) => {
    // ({ displayName, username, likes, isliked, isbookmarked, verified, text, image, avatar, id} ) => {
      const [modalShow, setModalShow] = React.useState(false);
      const [editShow, setEditShow] = React.useState(false);

      const Highlight = ({ children, highlightIndex }) => (
        <strong className="highlighted-text">{children}</strong>
      );

  const handledelete=()=>{
    props.deletepost(props.postindex, props.id)
  }

  if(props.retweeted){
console.log(props.rtweet.tweet)
      return (
        <div className="post">
          <div className="postheadwrap">
          <div className="posthead">
          <div className="post__avatar">
            <Avatar src={props.rtweet.tweet.profile_pic} />
          </div>
          {/* <div className="post__body"> */}
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {props.rtweet.tweet.name}{" "}
                  <span className="post__headerSpecial">
      {props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
                    {props.rtweet.tweet.username}</div>
                  </span>
                </h3>
              </div>
              </div>

            </div>
            {props.isowned? <DropdownButton id="dropdown-item-button" title="">
  <Dropdown.Item as="button" className="dropitem" onClick={() => setEditShow(true)}>Edit</Dropdown.Item>
  <Dropdown.Item as="button" className="dropitem" onClick={handledelete}>Delete</Dropdown.Item>
</DropdownButton>: null}
            
            </div>
            <div className="post__headerDescription">
                {/* <p>{props.text}</p> */}
                <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={[/\B\@([\w\-]+)/gim, /#[A-Za-z0-9]*/g]}
    highlightTag ={Highlight}
    textToHighlight={props.text}
    // textToHighlight={props.text}
  />
              </div> 

{/*  */}
              <div  className="rewrap">
              <div className="rewrapper">
            {/* {props.image? <img className="foodimg" src={props.image} alt="" />: null} */}
            <div className="reavatar">
  <Avatar src={props.rtweet.tweet.profile_pic} />
</div>
{/* <div className="post__body"> */}
  <div className="post__header">
    <div className="post__headerText">
      <h3>
        {props.rtweet.tweet.name}{" "}
        <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
          {props.rtweet.tweet.username}</div>
        </span>
      </h3>
    </div>
    </div>
    </div>
    <div className="reheaderDescription">
                {/* <p>{props.text}</p> */}
                <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={[/\B\@([\w\-]+)/gim, /#[A-Za-z0-9]*/g]}
    highlightTag ={Highlight}
    textToHighlight={props.rtweet.tweet.text}
    // textToHighlight={props.text}
  />
  <div className="reimgwrap">
    {props.rtweet.tweet.photos? <img className="foodimg" src={props.rtweet.tweet.photos} alt="" />: null}
  </div>
              </div> 
            </div>

            

{/*  */}
            <div className="post__footer">
              <Link className="post__commt" 
              to= {{
                pathname:'/comments',
                state:{tweetid: props.id}
              }}
              ><div><ChatBubbleOutlineIcon /><span className="peoplecount">{props.rtweet.tweet.TotalComments}</span></div></Link>
              {/* <div><FavoriteBorderIcon /><span className="peoplecount">12</span></div> */}
              {/* <LikeButton /> */}
              <LikeButton 
                pk={props.id} 
                likeis= {props.rtweet.tweet.liked}
                points= {props.rtweet.tweet.likes} 
                />
              <div onClick={() => setModalShow(true)}><RepeatIcon /><span className="peoplecount">12</span></div>
              {/* <div><PublishIcon /><span className="peoplecount">12</span></div> */}
              <BookmarkButton pk={props.id} 
              bookmarkedis= {props.rtweet.tweet.bookmarked}
              />

        <RetweetModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        avatar={props.avatar}
        username={props.username} text={props.text} 
        image={props.image} 
        name={props.displayName} id={props.id}
        key={props.id} displayName={props.name} 
      />

        <EditPostModal
        show={editShow}
        onHide={() => setEditShow(false)}
        avatar={props.avatar}
        username={props.username} text={props.text} 
        image={props.image} 
        name={props.displayName}
        key={props.id} 
        displayName={props.name} 
        id={props.id}
      />


            </div>
          </div>
        //  </div>
      );
            }
            else{
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
                        <Link to= {{
                pathname:'/user-profile',
                state:{tweetid: props.id}
              }}>{props.displayName}</Link>
                          <span className="post__headerSpecial">
              {props.verified && <VerifiedUserIcon className="post__badge" />} <div><Link to= {{
                pathname:'/user-profile',
                state:{tweetid: props.id}
              }}>@
                            {props.username}</Link></div>
                          </span>
                        </h3>
                      </div>
                      </div>
        
                    </div>
                    {props.isowned? <DropdownButton id="dropdown-item-button" title="">
          <Dropdown.Item as="button" className="dropitem" onClick={() => setEditShow(true)}>Edit</Dropdown.Item>
          <Dropdown.Item as="button" className="dropitem" onClick={handledelete}>Delete</Dropdown.Item>
        </DropdownButton>: null}
                    
                    </div>
                    <div className="post__headerDescription">
                        {/* <p>{props.text}</p> */}
                        <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[/\B\@([\w\-]+)/gim, /#[A-Za-z0-9]*/g]}
            highlightTag ={Highlight}
            textToHighlight={props.text}
          />
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
                name={props.displayName} id={props.id}
                key={props.id} displayName={props.name} 
              />
        
                <EditPostModal
                show={editShow}
                onHide={() => setEditShow(false)}
                avatar={props.avatar}
                username={props.username} text={props.text} 
                image={props.image} 
                name={props.displayName}
                key={props.id} 
                displayName={props.name} 
                id={props.id}
              />
              </div>
              </div>
               );
            }
    }
  );
  
  export default Post;