import data from "../../data.json";
import React, { useEffect, useRef, useState } from "react";

function SvgMobile(props) {
  let pathColor = "#DA9E68";
  let levelColor = "#F6EEEB";
  let strokeColor = "#D0976C";
  let mapColor = "#ECD29F";

  const xLocation = [200, 330, 220, 70];

  useEffect(() => {
    console.log(props.mapPath);
  }, []);
  return (
    <div>
      <svg
        height={props.svgHeight}
        width={window.innerWidth}
        className="svg-window"
        style={{ backgroundColor: { mapColor } }}
      >
        {/* Anchor Image */}
        <text x="40" y="80" className="svg-title-text">
          {data.lesson}
        </text>
        {props.mapPath.map((index) => {
          let right = index % 2 === 0;

          let svgD = `M 200 ${200 + index * 300} q  ${
            right ? 300 : -300
          } 150 0 300`;

          return (
            <g key={index}>
              <path d={svgD} stroke={pathColor} strokeWidth="20" fill="none" />
              {/* Crows Flying */}
              <image
                href="https://freesvg.org/img/Cranes-Flying-In-Formation-Silhouette.png"
                alt="mySvgImage"
                x={right ? 50 : 200}
                y={150 + index * 400}
                height="120px"
                width="120px"
              />
            </g>
          );
        })}
        <g className="parent-container-g">
          {Object.keys(data.content).map((val, index) => {
            let right = index % 2 === 0;

            let xValue = index % 4;
            let yValue = 200 + index * 150;
            return (
              <g
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  index <= props.currentLevel &&
                  props.onClickHandle(props.topics[index], index)
                }
              >
                <circle
                  fill={index > props.currentLevel ? pathColor : levelColor}
                  stroke={strokeColor}
                  strokeWidth="3"
                  id="pointA"
                  cx={xLocation[xValue]}
                  cy={yValue}
                  r="50"
                  className="circle-style"
                />
                <image
                  href={
                    index > props.currentLevel
                      ? "https://freesvg.org/img/glossy-orange-button.png"
                      : "https://freesvg.org/img/glossy-light-orange-button.png"
                  }
                  alt="mySvgImage"
                  x={xLocation[xValue] - 70}
                  y={yValue - 70}
                  height="140px"
                  width="140px"
                />
                <text
                  x={xLocation[xValue]}
                  y={yValue}
                  dy="5"
                  className="topic-style"
                  textAnchor="middle"
                >
                  {val}
                </text>
                {/* Locked Levels */}
                {index > props.currentLevel && (
                  <image
                    href="https://freesvg.org/img/1542668334.png"
                    alt="mySvgImage"
                    x={xLocation[xValue] - 14}
                    y={yValue - 15}
                    height="25px"
                    width="25px"
                  />
                )}
                {/* Current Level */}
                {index === props.currentLevel && (
                  <>
                    {/* Boat image twice to make it look dark */}
                    <image
                      href="https://freesvg.org/img/1549053314.png"
                      alt="mySvgImage"
                      x={xLocation[xValue] - 120}
                      y={yValue - 20}
                      height="120px"
                      width="120px"
                    />
                    <image
                      href="https://freesvg.org/img/1549053314.png"
                      alt="mySvgImage"
                      x={xLocation[xValue] - 120}
                      y={yValue - 20}
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
export default SvgMobile;
