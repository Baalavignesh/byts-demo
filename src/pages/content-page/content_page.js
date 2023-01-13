import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./content_page.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import data from "../../data.json";
import { useDispatch, useSelector } from "react-redux";
import { updateLevel } from "../../features/userSlice";
import "./content_page.css";

function ContentPage() {
  let [loading, setLoading] = useState(true);
  let [myProgress, setProgress] = useState([]);
  let topic = useParams();

  let dispatch = useDispatch();
  let user_current_topic = useSelector((state) => state.userdata.level);

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
    // id is subtopics in the lesson
    setProgress(myProgress);
    let subtopicKeys = Object.keys(data.content[topic["lesson"]]).length;

    let all_topic = Object.keys(data.content);
    let selected_topic_index = all_topic.lastIndexOf(topic["lesson"]);
    let user_current_topic_index = all_topic.lastIndexOf(user_current_topic);

    // If No more sub topic go back to home screen
    // If No more sub topic and finished the course then go to next topic

    if (topic["id"] > subtopicKeys - 1) {
      if (selected_topic_index === user_current_topic_index) {
        dispatch(updateLevel(all_topic[selected_topic_index + 1]));
      }
      navigate("/");
    }
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

  return loading ? (
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
                    {Object.keys(data.content[topic["lesson"]]).at(topic["id"])}
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
        <Button color="success" variant="outlined" onClick={() => nextHandle()}>
          Next Video
        </Button>
      </div>
    </div>
  );
}

export default ContentPage;
