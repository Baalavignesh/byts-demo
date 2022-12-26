  import React, { useEffect } from "react";
  import Navbar from "../../components/navbar/navbar";
  import "./home_page.css";
  import AddIcon from "@mui/icons-material/Add";
  import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
  import { useState } from "react";

  import data from "../../data.json";
  import Footer from "../../components/footer/footer";
  import { Outlet, useNavigate } from "react-router-dom";

  function HomePage() {
    let [expanded, setExpanded] = useState(false);

    let [expandedIndex, setExpandedIndex] = useState();

    let navigate = useNavigate();
    const titleColor = "#f2f2f2";
    const detailsColor = "#f2f2f2";

    const handleChange = (panel) => (event, isExpanded) => {
      setExpandedIndex(null);
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
      setExpanded(false);
      setExpandedIndex(null);
    }, []);

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

          <Outlet context={{ setExpandedIndex }} />
        </div>
        <Footer />
      </div>
    );
  }

  export default HomePage;
