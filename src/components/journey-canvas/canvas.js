import { Container, Sprite, Stage, Text } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react";
import anchor from "../../assets/anchor.png";
import map from "../../assets/mapp.png";
import boat from "../../assets/boat.png";
import courseData from "../../data.json";
import user from "../../data2.json";
import dark_bubble from "../../assets/dark_bubble.png";
import light_bubble from "../../assets/light_bubble.png";

function JourneyCanvas(props) {
  const [courseHeading, setCourseHeading] = useState();
  const [isLoading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  let itemPosition = {
    1: [30, 425],
    2: [200, 495],
    3: [210, 290],
    4: [370, 430],
    5: [430, 210],
    6: [580, 370],
    7: [680, 140],
    8: [790, 340],
    9: [910, 200],
  };

  useEffect(() => {
    setCourseHeading(Object.keys(courseData["content"]));
    setLoading(false);
    Object.keys(courseData["content"]).map(
      (value, index) => value === user.level && setCurrentLevel(index)
    );
  }, []);

  let onClickHandle = (val) => {
    props.topic(val);
    props.journey(false);
  };

  return (
    <div>
      {isLoading ? (
        <div> loading </div>
      ) : (
        <Stage
          width={1180}
          height={660}
          options={{ backgroundColor: 0xe6e7e9 }}
        >
          <Sprite image={map} x={0} y={0} width={1200} height={650} />

          {Object.keys(itemPosition).map((key, index) => {
            let x = itemPosition[key][0];
            let y = itemPosition[key][1];

            let dimension =
              user.level === courseHeading[index] ? [100, 100] : [80, 80];

            let item = user.level === courseHeading[index] ? boat : anchor;

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
                    onClickHandle(courseHeading[index]);
                  }}
                />

                {/* Text and Bubble Container */}
                <Container>
                  <Sprite
                    image={bubble}
                    key={index}
                    x={x}
                    y={y - 60}
                    width={100}
                    height={60}
                    cursor={"pointer"}
                    interactive={interactive}
                    pointerdown={() => {
                      onClickHandle(courseHeading[index]);
                    }}
                  />
                  <Text
                    text={courseHeading[index]}
                    x={x + 6}
                    y={y - 48}
                    style={{
                      fontFamily: "Kalam",
                      fontSize: 16,
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
            x={50}
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
