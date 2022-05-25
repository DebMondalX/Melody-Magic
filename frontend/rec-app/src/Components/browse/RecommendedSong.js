import React from "react";
import { increment_searches_count } from "../../Functions/incrementSearchesCount";
import "../../App.css";

function Recommendedsong(props) {
  function handleClick() {
    increment_searches_count(props.song.id);
    fetch(`http://localhost:8000/recommend`, {
      method: "POST",
      body: JSON.stringify({
        id: props.song.id,
        name: props.song.name,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        props.setSongs(data.tracks);
        console.log(data);
      });
  }
  return (
    <div className='recommendedSongContainer' onClick={handleClick}>
      <img
        src={props.song.album.images[1].url}
        alt={`${props.song.name} album art`}
        className='recommendedImage'
      ></img>
      <div className='recommendedSongWrapper'>
        <h2>{props.song.name}</h2>
      </div>
    </div>
  );
}

export default Recommendedsong;
