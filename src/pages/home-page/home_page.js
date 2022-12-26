import React from "react";
import Navbar from "../../components/navbar/navbar";
import "./home_page.css";
import AddIcon from "@mui/icons-material/Add";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";

import data from "../../data.json";
import JourneyCanvas from "../../components/journey-canvas/canvas";
import ContentPage from "../content-page/content_page";
import Footer from "../../components/footer/footer";

function HomePage() {
  let [expanded, setExpanded] = useState(false);
  let [showJourney, setShowJourney] = useState(true);
  let [currentTopic, setCurrentTopic] = useState("");

  const titleColor = "#f2f2f2";
  const detailsColor = "#f2f2f2";

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="homepage-main">
      <Navbar />
      <div className="homepage-content">
        <div className="journey-menu">
          {/* Heading */}
          <div className="journey-subject">C PROGRAMMING</div>

          {/* Iteration of all Headings */}
          {Object.keys(data["content"]).map((key, index) => {
            return (
              <Accordion
                disableGutters
                key={index}
                expanded={expanded === key}
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
                      <div key={topic}>
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
        {showJourney ? (
          <div className="journey-canvas">
            <JourneyCanvas journey={setShowJourney} topic={setCurrentTopic} />
          </div>
        ) : (
          <div>
            <ContentPage journey={setShowJourney} currentTopic={currentTopic} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
