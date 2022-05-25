import React from "react";
import "../../App.css";

function SelectedSong(props) {
  return (
    <div className='selectedSongContainer'>
      <img
        src={props.song.album.images[1].url}
        alt={`${props.song.name} album art`}
        className='mainImage'
      ></img>
      <div className='selectedSongWrapper'>
        <a
          href={props.song.external_urls.spotify}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>{props.song.name}</h2>
        </a>
        <a
          href={props.song.artists[0].external_urls.spotify}
          target='_blank'
          rel='noopener noreferrer'
        >
          <p>{props.song.artists[0].name}</p>
        </a>
      </div>
    </div>
  );
}

export default SelectedSong;
