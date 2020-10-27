import React from "react";
import "./SidebarOption.css";

function SidebarOption({ active, text }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;