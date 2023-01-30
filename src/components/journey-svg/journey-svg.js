import React, { useEffect, useRef, useState } from "react";
import "./journey-svg.css";
import data from "../../data.json";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SvgDesktop from "./svg-desktop";
import SvgMobile from "./svg-mobile";

function JourneySvg() {
  let [svgWidth, setSVGWidth] = useState();
  let [svgHeight, setSVGHeight] = useState();
  let [topics, setTopics] = useState([]);
  let [mapPath, setMapPath] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);

  let navigate = useNavigate();

  let user_level = useSelector((state) => state.userdata.level);

  let onClickHandle = (val, index) => {
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
    setSVGHeight(pathCurve * 600);
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
      {window.innerWidth > 1024 ? (
        <SvgDesktop
          svgWidth={svgWidth}
          currentLevel={currentLevel}
          mapPath={mapPath}
          onClickHandle={onClickHandle}
          topics={topics}
        />
      ) : (
        <SvgMobile
          svgHeight={svgHeight}
          svgWidth={svgWidth}
          currentLevel={currentLevel}
          mapPath={mapPath}
          onClickHandle={onClickHandle}
          topics={topics}
        />
      )}
    </div>
  );
}

export default JourneySvg;
