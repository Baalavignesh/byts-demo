import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar-main">
      <img src={require("../../assets/logo.jpg")} alt="byts-logo" className="navbar-logo"></img>
      <div className="navbar-menu">
        <p className="navbar-topic">DETECTING LOOP IN LINKED LIST</p>
        <p>|</p>
        <p>TOPIC*</p>
      </div>

      <div className="navbar-profile">
        <AccountCircleIcon />
        <p className="navbar-profile-text">Your Profile</p>
      </div>
    </div>
  );
}

export default Navbar;
