import React, { useState, useEffect } from "react";
import '../Trending/Trending.css'

function NotificationList() {


  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Notifications</h2>
      </div>

    <div class="card">
        <div class="card-body">
        <h6 className="trendingtag">There was a login to your account from a new device on Oct 25, 2020. Review it now.</h6>
        {/* <h5 className="tagname">There was a login to your account from a new device on Oct 25, 2020. Review it now.</h5> */}
        </div>
    </div>
          
    </div>
  );
}

export default NotificationList;