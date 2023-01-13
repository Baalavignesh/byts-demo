import React, { useEffect, useRef, useState } from "react";
import "./journey-svg.css";
import data from "../../data.json";
import { useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import Boat from "./boat.svg";
import { useNavigate } from "react-router-dom";

function JourneySvg() {
  let [svgWidth, setSVGWidth] = useState();
  let [topics, setTopics] = useState([]);
  let [mapPath, setMapPath] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);

  let pathColor = "#DA9E68";
  let levelColor = "#F6EEEB";
  let strokeColor = "#D0976C";
  let mapColor = "#ECD29F";

  let navigate = useNavigate();

  let user_level = useSelector((state) => state.userdata.level);
  const yLocation = [350, 200, 350, 500];

  let onClickHandle = (val, index) => {
    console.log("sending", index);
    navigate(`/learn/${val}/0`);
  };

  //   Path Values
  useEffect(() => {
    setMapPath(
      Array.apply(null, Array(Math.floor(topics.length / 3) + 1)).map(function (
        x,
        i
      ) {
        return i;
      })
    );

    let pathCurve = Math.floor(topics.length / 3);
    setSVGWidth(pathCurve * 600);
  }, [topics]);

  useEffect(() => {
    console.log(svgWidth);
  }, [svgWidth]);

  let useHorizontalScroll = () => {
    const elRef = useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e) => {
          if (e.deltaY == 0) return;
          if (
            !(el.scrollLeft === 0 && e.deltaY < 0) &&
            !(
              el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) ===
                0 && e.deltaY > 0
            )
          ) {
            e.preventDefault();
          }
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            // behavior: 'smooth'
          });
        };
        el.addEventListener("wheel", onWheel);
        return () => el.removeEventListener("wheel", onWheel);
      }
    }, []);
    return elRef;
  };
  useEffect(() => {
    setTopics(Object.keys(data.content));

    Object.keys(data["content"]).map(
      (value, index) => value === user_level && setCurrentLevel(index)
    );

    // setWidth();
  }, []);

  const scrollRef = useHorizontalScroll();
  return (
    <div
      className="svg-main"
      style={
        window.innerWidth > 1024
          ? { width: window.innerWidth * 0.8 }
          : { width: window.innerWidth }
      }
      ref={scrollRef}
      id="style-2"
    >
      <svg
        height={600}
        width={svgWidth}
        className="svg-window"
        style={{ backgroundColor: { mapColor } }}
      >
        {/* Anchor Image */}
        <text x="40" y="80" className="svg-title-text">
          {data.lesson}
        </text>
        {mapPath.map((index) => {
          let top = index % 2 === 0;

          let svgD = `M ${100 + index * 400} 350 q 200  ${
            top ? -300 : 300
          } 400 0`;

          return (
            <g key={index}>
              <path d={svgD} stroke={pathColor} strokeWidth="20" fill="none" />
              <image
                href="https://freesvg.org/img/Cranes-Flying-In-Formation-Silhouette.png"
                alt="mySvgImage"
                x={index * 400 + 150}
                y={top ? 400 : 100}
                height="120px"
                width="120px"
              />
            </g>
          );
        })}
        <g className="parent-container-g">
          {Object.keys(data.content).map((val, index) => {
            let yValue = index % 4;
            let xValue = 200 * index + 100;
            return (
              <g
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  index <= currentLevel && onClickHandle(topics[index], index)
                }
              >
                {/* <circle
                  fill={index > currentLevel ? pathColor : levelColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                  id="pointA"
                  cx={xValue}
                  cy={yLocation[yValue]}
                  r="50"
                  className="circle-style"
                /> */}
                <image
                  href={
                    index > currentLevel
                      ? "https://freesvg.org/img/glossy-orange-button.png"
                      : "https://freesvg.org/img/glossy-light-orange-button.png"
                  }
                  alt="mySvgImage"
                  x={xValue - 70}
                  y={yLocation[yValue] - 70}
                  height="140px"
                  width="140px"
                />
                <text
                  x={xValue}
                  y={yLocation[yValue]}
                  dy="5"
                  className="topic-style"
                  textAnchor="middle"
                >
                  {val}
                </text>
                {/* Locked Levels */}
                {index > currentLevel && (
                  <image
                    href="https://freesvg.org/img/1542668334.png"
                    alt="mySvgImage"
                    x={xValue - 14}
                    y={yLocation[yValue] - 15}
                    height="25px"
                    width="25px"
                  />
                )}
                {/* Current Level */}
                {index === currentLevel && (
                  <>
                    {/* Boat image twice to make it look dark */}
                    <image
                      href="https://freesvg.org/img/1549053314.png"
                      alt="mySvgImage"
                      x={xValue - 120}
                      y={yLocation[yValue] - 20}
                      height="120px"
                      width="120px"
                    />
                    <image
                      href="https://freesvg.org/img/1549053314.png"
                      alt="mySvgImage"
                      x={xValue - 120}
                      y={yLocation[yValue] - 20}
                      height="120px"
                      width="120px"
                    />
                  </>
                )}
              </g>
            );
          })}
        </g>
        Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  );
}

export default JourneySvg;
