import React, { forwardRef } from "react";
import {ReactComponent as Star} from '../../../../assets/icons/Star.svg'

const FollowerCards = forwardRef(
    ({ notificationtext }) => {
      return (
<div class="card trendcard">
<div class="card-body">
<h6 className="trendingtag"><Star className="staricon" />{notificationtext} </h6>
</div>
</div>

      );
    }
  );
  
  export default FollowerCards;