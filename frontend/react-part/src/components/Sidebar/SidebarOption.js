import React from "react";
import "./SidebarOption.css";
// import HomeIcon from "@material-ui/icons/Home";
import {Link} from 'react-router-dom';

function SidebarOption({ active, text, Icon, redirect }) {

  
  const logoutHandler=()=>{
    console.log("out")
    localStorage.clear();
  }

  if(text==="Logout"){
    return (
      <Link className="sidebar_links" to={redirect} onClick={logoutHandler}>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
      </Link>
    );
  }
  else{
  return (
    <Link className="sidebar_links" to={redirect}>
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
    </Link>
  );
  }
}

export default SidebarOption;