import React from "react";
import "../../App.css";

function RecommendedSong(props) {
  return (
    <div className='recommendedSongContainer'>
      <a
        href={props.song.external_urls.spotify}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src={props.song.album.images[1].url}
          alt={`${props.song.name} album art`}
          className='personalisedSongImage'
        ></img>
        <div className='personalisedSongWrapper'>
          <h2>{props.song.name}</h2>
          <p>{props.song.artists[0].name}</p>
        </div>
      </a>
    </div>
  );
}

export default RecommendedSong;
