import React from "react";
import "../App.css";

function Sidebar(props) {
  function handleClick(type) {
    props.setOption(type);
  }

  return (
    <ul>
      <li
        className={props.option === "popular" ? "highlight" : null}
        onClick={() => handleClick("popular")}
      >
        Popular songs
      </li>
      <li
        className={props.option === "browse" ? "highlight" : null}
        onClick={() => handleClick("browse")}
      >
        Browse songs
      </li>
      <li
        className={props.option === "personalised" ? "highlight" : null}
        onClick={() => handleClick("personalised")}
      >
        Personalised playlist
      </li>
    </ul>
  );
}

export default Sidebar;
