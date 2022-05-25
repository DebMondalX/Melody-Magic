import React from "react";
import { Listbox } from "@headlessui/react";
import "../../App.css";

const ratings = [0, 1, 2, 3, 4, 5];

function SongOption(props) {
  function handleChange(rating) {
    props.setUserRatings(oldState => {
      const newState = [...oldState];
      newState[props.index] = rating;
      return newState;
    });
  }

  return (
    <div className='recommendedSongContainer'>
      <a href={props.song.spotifyUrl} target='_blank' rel='noopener noreferrer'>
        <img
          src={props.song.imgSrc}
          alt={`${props.song.name} album art`}
          className='personalisedSongImage'
        ></img>
        <div className='personalisedSongWrapper'>
          <h2>{props.song.name}</h2>
          <p>{props.song.artist}</p>
        </div>
      </a>

      <div className='listboxContainer'>
        <Listbox value={props.userRatings[props.index]} onChange={handleChange}>
          <Listbox.Button className='ratings'>
            {props.userRatings[props.index]}
          </Listbox.Button>
          <Listbox.Options className='ratingsOptions'>
            {ratings.map((rating, i) => (
              <Listbox.Option key={i} value={rating}>
                {rating}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}

export default SongOption;
