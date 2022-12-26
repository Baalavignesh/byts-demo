import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./content_page.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


function ContentPage(props) {
  let [loading, setLoading] = useState(true);
  let [myProgress, setProgress] = useState(["Learn", "C"]);

  useEffect(() => {
    setProgress(myProgress.concat([props.currentTopic]));
    setLoading(false);
  }, [props.currentTopic]);
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="content-page">
          <div className="content-progress-bar">
            <div className="content-progress">
              {myProgress.map((value, index) => {
                console.log(value);
                return (
                  <div className="content-style">
                    <p className="content-text"> {value}</p>

                    {index < myProgress.length - 1 && (
                      <ArrowForwardIosIcon fontSize="small" />
                    )}
                  </div>
                );
              })}

              {/* {Object.keys(data["content"][props.currentTopic]).map(
                (value, index) => {
                  return (
                    <div className="content-style">
                      <p className="content-text"> {value}</p>

                      {index <
                        Object.keys(data["content"][props.currentTopic])
                          .length -
                          1 && <ArrowForwardIosIcon fontSize="small" />}
                    </div>
                  );
                }
              )} */}
            </div>
            <div>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  props.journey(true);
                }}
                style={{ width: "150px", padding: ".8rem" }}
              >
                View Journey
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentPage;
