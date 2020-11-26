import React, { forwardRef } from "react";
import classes from "./ChatCards.module.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Avatar } from "@material-ui/core";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'

const FollowerCards = forwardRef(
    ({ displayName, username, verified,avatar, chatId }, ref) => {

    
      return (
        <div className={classes.post} ref={ref}>
          <Link to={`/messages/chat/${chatId}`}>
          <div className={classes.headwrap}>
<div className={classes.posthead}>
          <div className={classes.avatar}>
            <Avatar src={avatar} />
          </div>
          {/* <div className="post__body"> */}
            <div className={classes.header}>
              <div className={classes.headerText}>
                <h3>
                  {displayName}{" "}
                  <span className="post__headerSpecial">
      {verified && <VerifiedUserIcon className={classes.badge} />} <div>@
                    {username}</div>
                  </span>
                </h3>

              </div>

            </div>
</div>
            </div>
            </Link>
            </div>
      );
    }
  );
  
  export default FollowerCards;