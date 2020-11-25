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
// console.log(props.isowned)
      let authorprofile
      if(props.isowned){
        authorprofile= <h3>

                        <Link to= {{
                pathname:'/profile'
              }} className="userlinks">{props.displayName}</Link>
                          <span className="post__headerSpecial">
              {props.verified && <VerifiedUserIcon className="post__badge" />} <div><Link className="userlinks" to= {{
                pathname:'/profile'
              }}>@
                            {props.username}</Link></div>
                          </span>

                          
                        </h3>
      }
      else{
        authorprofile= <h3>

        <Link className="userlinks" to= {{
pathname:'/user-profile',
state:{userid: props.user}
}}>{props.displayName}</Link>
          <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div><Link className="userlinks" to= {{
pathname:'/user-profile',
state:{userid: props.user}
}}>@
            {props.username}</Link></div>
          </span>
        </h3>
      }

    // ({ displayName, username, likes, isliked, isbookmarked, verified, text, image, avatar, id} ) => {
      const [modalShow, setModalShow] = React.useState(false);
      const [editShow, setEditShow] = React.useState(false);

      const Highlight = ({ children, highlightIndex }) => (
        <strong className="highlighted-text">{children}</strong>
      );

  const handledelete=()=>{
    props.deletepost(props.postindex, props.id)
  }
console.log(props)

  if(props.retweeted){
    let retweetauthor
    let reprofile
    if(props.rtweet.tweet.owner){
      retweetauthor= <h3>
      <Link className="userlinks" to= {{
                pathname:'/profile'
              }}
                  >{props.rtweet.tweet.name}</Link>
        <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
<Link className="userlinks" to= {{
                pathname:'/profile'
              }}
                  >{props.rtweet.tweet.username}</Link></div>
        </span>
      </h3>
    }
    else{
      retweetauthor= <h3>
      <Link className="userlinks" to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.tweet.user_id}
              }}
                  >{props.rtweet.tweet.name}</Link>
        <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
<Link className="userlinks" to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.tweet.user_id}
              }}
                  >{props.rtweet.tweet.username}</Link></div>
        </span>
      </h3>
    }

    if(props.rtweet.owner){
      reprofile=<h3>
      <Link className="userlinks" to= {{
    pathname:'/profile'
  }}
      >{props.rtweet.user.profile.name}</Link>
      <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
<Link className="userlinks" to= {{
    pathname:'/profile'
  }}
      >{props.rtweet.user.username}</Link></div>
      </span>
    </h3>
    }

    else{
      reprofile=<h3>
      <Link className="userlinks" to= {{
    pathname:'/user-profile',
    state:{userid: props.rtweet.user_id}
  }}
      >{props.rtweet.user.profile.name}</Link>
      <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
<Link className="userlinks" to= {{
    pathname:'/user-profile',
    state:{userid: props.rtweet.user_id}
  }}
      >{props.rtweet.user.username}</Link></div>
      </span>
    </h3>
    }



console.log(props.rtweet.tweet)
      return (
        <div className="post">
          <div className="postheadwrap">
          <div className="posthead">
          <div className="post__avatar">
            <Avatar src={props.rtweet.user.profile.picture} />
          </div>
          {/* <div className="post__body"> */}
            <div className="post__header">
              <div className="post__headerText">


                {/* <h3>
                  <Link to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.user_id}
              }}
                  >{props.rtweet.user.profile.name}</Link>
                  <span className="post__headerSpecial">
      {props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
      <Link to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.user_id}
              }}
                  >{props.rtweet.user.username}</Link></div>
                  </span>
                </h3> */}

                {reprofile}
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
      {/* <h3>
      <Link to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.tweet.user_id}
              }}
                  >{props.rtweet.tweet.name}</Link>
        <span className="post__headerSpecial">
{props.verified && <VerifiedUserIcon className="post__badge" />} <div>@
<Link to= {{
                pathname:'/user-profile',
                state:{userid: props.rtweet.tweet.user_id}
              }}
                  >{props.rtweet.tweet.username}</Link></div>
        </span>
      </h3> */}
      {retweetauthor}
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
                state:{tweetid: props.rtweet.tweet.id}
              }}
              ><div><ChatBubbleOutlineIcon /><span className="peoplecount">{props.rtweet.tweet.TotalComments}</span></div></Link>
              {/* <div><FavoriteBorderIcon /><span className="peoplecount">12</span></div> */}
              {/* <LikeButton /> */}
              <LikeButton 
                pk={props.rtweet.tweet.id} 
                likeis= {props.rtweet.tweet.liked}
                points= {props.rtweet.tweet.likes} 
                />
              <div onClick={() => setModalShow(true)}><RepeatIcon /><span className="peoplecount">{props.rtweet.tweet.retweets}</span></div>
              {/* <div><PublishIcon /><span className="peoplecount">12</span></div> */}
              <BookmarkButton pk={props.rtweet.tweet.id} 
              bookmarkedis= {props.rtweet.tweet.bookmarked}
              />

        <RetweetModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        avatar={props.rtweet.tweet.avatar}
        username={props.rtweet.tweet.username} text={props.rtweet.tweet.text} 
        image={props.rtweet.tweet.image} 
        name={props.rtweet.tweet.displayName} id={props.rtweet.tweet.id}
        key={props.rtweet.tweet.id} displayName={props.rtweet.tweet.name} 
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
                        {/* <h3>

                        <Link to= {{
                pathname:'/user-profile',
                state:{userid: props.user}
              }}>{props.displayName}</Link>
                          <span className="post__headerSpecial">
              {props.verified && <VerifiedUserIcon className="post__badge" />} <div><Link to= {{
                pathname:'/user-profile',
                state:{userid: props.user}
              }}>@
                            {props.username}</Link></div>
                          </span>

                          
                        </h3> */}
                        {authorprofile}
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
                      <div onClick={() => setModalShow(true)}><RepeatIcon /><span className="peoplecount">{props.retweetcount}</span></div>
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