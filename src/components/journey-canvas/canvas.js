import { Container, Sprite, Stage, Text } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react";
import anchor from "../../assets/anchor.png";
import map from "../../assets/mapp.png";
import boat from "../../assets/boat.png";
import courseData from "../../data.json";
import dark_bubble from "../../assets/dark_bubble.png";
import light_bubble from "../../assets/light_bubble.png";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import "./canvas.css";

function JourneyCanvas() {
  const [courseHeading, setCourseHeading] = useState();
  const [isLoading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);

  let user_level = useSelector((state) => state.userdata.level);

  let navigate = useNavigate();

  let { setExpandedIndex } = useOutletContext();

  let [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  let [canvasHeight, setCanvasHeight] = useState(window.innerHeight);

  let itemPosition = {
    1: [canvasWidth * 0.025, canvasHeight * 0.78],
    2: [canvasWidth * 0.16, canvasHeight * 0.76],
    3: [canvasWidth * 0.16, canvasHeight * 0.46],
    4: [canvasWidth * 0.3, canvasHeight * 0.68],
    5: [canvasWidth * 0.35, canvasHeight * 0.3],
    6: [canvasWidth * 0.47, canvasHeight * 0.62],
    7: [canvasWidth * 0.55, canvasHeight * 0.2],
    8: [canvasWidth * 0.66, canvasHeight * 0.55],
    9: [canvasWidth * 0.75, canvasHeight * 0.3],
  };

  const handleResize = () => {
    // Desktop Width
    if (window.innerWidth > 1180) {
      setCanvasHeight(window.innerHeight * 0.8);
      setCanvasWidth(window.innerWidth * 0.8);
    }
    // Ipad and other screen
    else if (window.innerWidth > 576 && window.innerWidth < 1180) {
      setCanvasHeight(window.innerHeight * 0.6);
      setCanvasWidth(window.innerWidth * 0.9);
    } else {
      setCanvasHeight(window.innerHeight * 0.3);
      setCanvasWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    console.log(Math.floor(canvasWidth * 0.2));
    setCourseHeading(Object.keys(courseData["content"]));
    setLoading(false);
    Object.keys(courseData["content"]).map(
      (value, index) => value === user_level && setCurrentLevel(index)
    );


    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  let onClickHandle = (val, index) => {
    console.log("sending", index);
    setExpandedIndex(index);
    navigate(`/learn/${val}/0`);
  };

  return (
    <div className="canvas-style">
      {isLoading ? (
        <div> loading </div>
      ) : (
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          options={{ backgroundColor: 0xe6e7e9 }}
        >
          <Sprite
            image={map}
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
          />

          {Object.keys(itemPosition).map((key, index) => {
            let x = itemPosition[key][0];
            let y = itemPosition[key][1];

            let dimension =
              user_level === courseHeading[index]
                ? [canvasWidth * 0.08, canvasWidth * 0.08]
                : [canvasWidth * 0.08, canvasWidth * 0.08];

            let item = user_level === courseHeading[index] ? boat : anchor;

            let bubble = index <= currentLevel ? dark_bubble : light_bubble;
            let textColor = index <= currentLevel ? "white" : "black";

            let interactive = index <= currentLevel ? true : false;
            return (
              <Container key={index}>
                {/* Boat or Anchor */}
                <Sprite
                  image={item}
                  cursor={"pointer"}
                  key={index}
                  x={x}
                  y={y}
                  width={dimension[0]}
                  height={dimension[1]}
                  interactive={interactive}
                  pointerdown={() => {
                    onClickHandle(courseHeading[index], index);
                  }}
                />

                {/* Text and Bubble Container */}
                <Container>
                  <Sprite
                    image={bubble}
                    key={index}
                    x={x - canvasWidth * 0.005}
                    y={y - canvasWidth * 0.055}
                    width={canvasWidth * 0.09}
                    height={canvasWidth * 0.045}
                    cursor={"pointer"}
                    interactive={interactive}
                    pointerdown={() => {
                      onClickHandle(courseHeading[index]);
                    }}
                  />
                  <Text
                    text={courseHeading[index]}
                    x={x + canvasWidth * 0.0}
                    y={y - canvasWidth * 0.048}
                    style={{
                      fontFamily: "Kalam",
                      fontSize: canvasWidth * 0.013,
                      fontWeight: 400,
                      wordWrap: true,
                      fill: textColor,
                      wordWrapWidth: 440,
                    }}
                  />
                </Container>
              </Container>
            );
          })}

          <Text
            text="C Programming Journey"
            x={canvasWidth * 0.01}
            y={50}
            style={{
              fontFamily: "Kalam",
              fontSize: 28,
              fontWeight: 400,
              wordWrap: true,
              wordWrapWidth: 440,
            }}
          />
        </Stage>
      )}
    </div>
  );
}

export default JourneyCanvas;
