import React, {useState} from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CreateIcon from '@material-ui/icons/Create';

import PostModal from'../UI/PostModal/PostModal';

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from "@material-ui/core";

function Sidebar({propactive}) {

  // const [show, setShow] = useState("show");

  // const handleClose = () => setShow("hide");
  // const handleShow = () => setShow("show");

  const [modalShow, setModalShow] = React.useState(false);


  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      {propactive==="home"? <SidebarOption active Icon={HomeIcon} redirect='/' text="Home" />:<SidebarOption Icon={HomeIcon} redirect='/' text="Home" /> }
      {propactive==="explore"? <SidebarOption active Icon={SearchIcon} redirect='/explore' text="Explore" />:<SidebarOption Icon={SearchIcon} redirect='/explore' text="Explore" /> }
      {propactive==="notifications"? <SidebarOption active Icon={NotificationsNoneIcon} redirect='/notifications' text="Notifications" />:<SidebarOption Icon={NotificationsNoneIcon} redirect='/notifications' text="Notifications" /> }
      {propactive==="messages"? <SidebarOption active Icon={MailOutlineIcon} redirect='/messages' text="Messages" />:<SidebarOption Icon={MailOutlineIcon} redirect='/messages' text="Messages" /> }
      {propactive==="bookmarks"? <SidebarOption active Icon={BookmarkBorderIcon} redirect='/bookmarks' text="Bookmarks" />:<SidebarOption Icon={BookmarkBorderIcon} redirect='/bookmarks' text="Bookmarks" /> }
      {propactive==="profile"? <SidebarOption active Icon={PermIdentityIcon} redirect='/profile' text="Profile" />:<SidebarOption Icon={PermIdentityIcon} redirect='/profile' text="Profile" /> }
      

      <SidebarOption Icon={ExitToAppIcon} text="Logout" redirect="/log-in" />

      <Button onClick={() => setModalShow(true)} variant="outlined" className="sidebar__tweet" fullWidth>
        Post
      </Button>

      
      <div className="sidebarOption">
      <CreateIcon onClick={() => setModalShow(true)} className="addposticon"/>
    </div>



      {/* <PostModal showvar={show}/> */}

      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Sidebar;