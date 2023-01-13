import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./navbar.css";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar(props) {
  return (
    <div className="navbar-main">
      <div className="drawer-icon">
        <IconButton
        
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => props.handleDrawer()}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <img
        src={require("../../assets/logo.jpg")}
        alt="byts-logo"
        className="navbar-logo"
      ></img>
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
