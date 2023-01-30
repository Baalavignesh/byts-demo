import React from "react";
import data from "../../data.json";

function SvgDesktop(props) {
  let pathColor = "#DA9E68";
  let levelColor = "#F6EEEB";
  let strokeColor = "#D0976C";
  let mapColor = "#ECD29F";

  const yLocation = [350, 200, 350, 500];

  return (
    <div>
      <svg
        height={600}
        width={props.svgWidth}
        className="svg-window"
        style={{ backgroundColor: { mapColor } }}
      >
        {/* Anchor Image */}
        <text x="40" y="80" className="svg-title-text">
          {data.lesson}
        </text>
        {props.mapPath.map((index) => {
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
            let xValue = 200 * index + 100;
            let yValue = index % 4;
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
                  cx={xValue}
                  cy={yLocation[yValue]}
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
                {index > props.currentLevel && (
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
                {index === props.currentLevel && (
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
export default SvgDesktop;
