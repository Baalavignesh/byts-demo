import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./content_page.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../data.json";

function ContentPage() {
  let [loading, setLoading] = useState(true);
  let [myProgress, setProgress] = useState([]);
  let topic = useParams();

  let navigate = useNavigate();
  useEffect(() => {
    myProgress.pop();
    myProgress.pop();
    myProgress.pop();
    myProgress.pop();
    myProgress.push("Learn");
    myProgress.push("C");
    myProgress.push([topic["lesson"]]);
    myProgress.push([topic["id"]]);
    setProgress(myProgress);

    topic["id"] > Object.keys(data.content[topic["lesson"]]).length - 1 &&
      navigate("/");
    setLoading(false);
  }, [topic]);

  let nextHandle = (val) => {
    navigate(
      `/learn/${topic["lesson"]}/${parseFloat(topic["id"]) + parseFloat(1)}`
    );
  };

  let backHandle = (val) => {
    navigate(`/learn/${topic["lesson"]}/${topic["id"] - 1}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="content-main">
          <div className="content-progress-bar">
            <div className="content-progress">
              {myProgress.map((value, index) => {
                return (
                  <div className="content-style" key={index}>
                    {index < myProgress.length - 1 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p className="content-text"> {value}</p>
                        <ArrowForwardIosIcon fontSize="small" />
                      </div>
                    ) : (
                      <div>
                        {Object.keys(data.content[topic["lesson"]]).at(
                          topic["id"]
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  navigate("/journey");
                }}
                style={{ width: "150px", padding: ".8rem" }}
              >
                View Journey
              </Button>
            </div>
          </div>
          <div className="content-box">
            <div>Video Box</div>
          </div>
          <div className="content-next">
            <Button color="primary" variant="text" onClick={() => backHandle()}>
              Back
            </Button>
            <Button
              color="success"
              variant="outlined"
              onClick={() => nextHandle()}
            >
              Next Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentPage;
