import React from "react";
import "./SidebarOption.css";
// import HomeIcon from "@material-ui/icons/Home";
import {Link} from 'react-router-dom';

function SidebarOption({ active, text, Icon, redirect }) {
  return (
    <Link className="sidebar_links" to={redirect}>
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
    </Link>
  );
}

export default SidebarOption;