import React from "react";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-content">
        <div className="quick-links">
          <h3>Quicklinks</h3>
          <p>Home</p>
          <p>Features</p>
          <p>Pricing</p>
          <p>Teams</p>
          <p>Contact Us</p>
        </div>
        <div className="quick-links">
          <h3>Quicklinks</h3>
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>FAQ</p>
          <p>Support</p>
        </div>
        <div className="about-us quick-links">
          <h3>About Us</h3>
          <p>
            We are a passionate group of Tech Enthusiasts with the motto of
            making Programming and Logical Thinking accessible to interested
            students all over the world.
          </p>
        </div>
        <div className="quick-links follow-us">
          <h3>Follow Us</h3>
          <div>
            <FacebookIcon className="footer-icons" />
            <InstagramIcon className="footer-icons" />
          </div>
        </div>
      </div>
      <div>
        <div>© 2022 Byts. All rights served.</div>
        <h1 className="made-by">
          Made with <FavoriteIcon /> by Byts
        </h1>
      </div>
    </div>
  );
}

export default Footer;
