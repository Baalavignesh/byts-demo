import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./home_page.css";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
} from "@mui/material";
import { useState } from "react";

import data from "../../data.json";
import Footer from "../../components/footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  let [expanded, setExpanded] = useState(false);
  let [expandedIndex, setExpandedIndex] = useState();

  let navigate = useNavigate();
  let current_topic = useSelector((state) => state.userdata.level);

  const titleColor = "#f2f2f2";
  const detailsColor = "#f2f2f2";

  // Drawer Settings
  const drawerWidthPhone = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedIndex(null);
    setExpanded(isExpanded ? panel : false);
  };

  const handleResize = () => {
    window.innerWidth > 1180 ? setIsDesktop(true) : setIsDesktop(false);
  };

  useEffect(() => {
    setExpanded(false);
    setExpandedIndex(null);
    window.innerWidth > 1180 ? setIsDesktop(true) : setIsDesktop(false);
    window.addEventListener("resize", handleResize);
  }, []);

  const drawer = (
    <div className="journey-menu">
      {/* Heading */}
      <div className="journey-subject">C PROGRAMMING</div>

      {/* Iteration of all Headings */}
      {Object.keys(data["content"]).map((key, index) => {
        return (
          <Accordion
            disableGutters
            key={index}
            expanded={
              expanded === key || (index === expandedIndex ? true : false)
            }
            onChange={handleChange(key)}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              id={index}
              className="accordian-title"
              style={{ backgroundColor: titleColor }}
            >
              <p className="journey-heading">{key}</p>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: detailsColor }}>
              {/* Iteration of all Topics */}
              {Object.keys(data["content"][key]).map((topic, index2) => {
                return (
                  <div
                    key={topic}
                    onClick={() => {
                      navigate(`learn/${key}/${index2}`);
                    }}
                  >
                    <p key={topic} className="journey-topic">
                      {index2 + 1}. {topic}
                    </p>
                    {data["content"][key][topic].map((subtopic, index) => {
                      return (
                        <p className="journey-subtopic" key={index}>
                          {subtopic}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );

  return (
    <div className="homepage-main">
      <Navbar handleDrawer={handleDrawerToggle} />
      {/* Only visible in mobile */}
      <div className="mobile-progress">Current Level : {current_topic}</div>

      {/* Responsive Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "block", lg: "block", xl: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidthPhone,
          },
        }}
      >
        {drawer}
      </Drawer>

      <div className="homepage-content">
        <div className="canvas-and-content">
          {isDesktop && drawer}
          <Outlet context={{ setExpandedIndex }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
