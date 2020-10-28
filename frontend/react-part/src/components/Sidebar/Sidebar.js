import React from "react";
import "./Sidebar.css";
// import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
      <SidebarOption active Icon={HomeIcon} redirect='/log-in' text="Home" />
      <SidebarOption Icon={SearchIcon} redirect='/explore' text="Explore" />
      <SidebarOption Icon={NotificationsNoneIcon} redirect='/notifications' text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} redirect='/messages' text="Messages" />
      <SidebarOption Icon={BookmarkBorderIcon} redirect='/bookmarks' text="Bookmarks" />
      <SidebarOption Icon={PermIdentityIcon} redirect='/profile' text="Profile" />
      <SidebarOption Icon={ExitToAppIcon} text="Logout" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;