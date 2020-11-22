import React, { forwardRef } from "react";
import {ReactComponent as Star} from '../../../../assets/icons/Star.svg'

const FollowerCards = forwardRef(
    ({ notificationtext, tweetdata }) => {
      return (
<div class="card trendcard">
<div class="card-body">
      <h6 className="trendingtag"><Star className="staricon" />{notificationtext} "{tweetdata}" </h6>
</div>
</div>

      );
    }
  );
  
  export default FollowerCards;