import React from "react";
import "../../App.css";

function PopularSongs(props) {
  function handleClick() {
    fetch(`http://localhost:8000/recommend`, {
      method: "POST",
      body: JSON.stringify({
        id: props.song.id,
        name: props.song.name,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        props.setOption("browse");
        props.setSongs(data.tracks);
      });
  }
  return (
    <div onClick={handleClick} className='recommendedSongContainer'>
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

export default PopularSongs;
