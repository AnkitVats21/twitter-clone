import React, { forwardRef } from "react";
import {ReactComponent as Star} from '../../../../assets/icons/ninja.svg'
import { Avatar } from "@material-ui/core";
import {Link} from 'react-router-dom'

const FollowerCards = forwardRef(
    ({ notificationtext, profilepic, tweetdata, tweetid, type }) => {

if(type==="Tweet"){

      return (
<div className="card trendcard" >
<Link to= {{
                pathname:'/comments',
                state:{tweetid: tweetid}
              }}>
<div className="card-body">
      <div className="notification-block">
      <div className="hh"><Star className="staricon" /></div>
      <div className="hih">
      <Avatar src={profilepic}/>
      <h6 className="notification-text">{tweetdata}</h6>
      <h6 className="notification-tweet">{notificationtext}</h6>
      </div>
      </div>
</div>
</Link>
</div>
      );
}

else{
      return (
<div className="card trendcard" >
<Link to= '/followers'>
<div className="card-body">
      <div className="notification-block">
      <div className="hh"><Star className="staricon" /></div>
      <div className="hih">
      <Avatar src={profilepic}/>
      <h6 className="notification-text">{tweetdata}</h6>
      <h6 className="notification-tweet">{notificationtext}</h6>
      </div>
      </div>
</div>
</Link>
</div>
      );

}


    }
  );
  
  export default FollowerCards;