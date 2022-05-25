import React, { useState } from "react";
import SongOption from "./SongOption";
import RecommendedSong from "./RecommendedSong";
import "../../App.css";

const songs = [
  {
    name: "For you",
    artist: "Keith Urban",
    imgSrc: "https://i.scdn.co/image/ab67616d00001e027ad7cdd52def490ddd20b770",
    spotifyUrl: "https://open.spotify.com/track/64bWFjtzBRVSllQz9H2RAY",
  },
  {
    name: "Every night",
    artist: "Imagine Dragons",
    imgSrc: "https://i.scdn.co/image/ab67616d00001e02b2b2747c89d2157b0b29fb6a",
    spotifyUrl: "https://open.spotify.com/track/3WQZfz5DLbO2vnJDWNxRBf",
  },
  {
    name: "Invincible",
    artist: "Machine Gun Kelly",
    imgSrc: "https://i.scdn.co/image/ab67616d00001e02cfac68443715de902bd7ea53",
    spotifyUrl: "https://open.spotify.com/track/1zBBo7indT2foQGQUoloWj",
  },
  {
    name: "D.D.",
    artist: "The Weeknd",
    imgSrc: "https://i.scdn.co/image/ab67616d00001e02b5d7c1fb40878285bc547649",
    spotifyUrl: "https://open.spotify.com/track/0d2nqd8iWUX0BpLo6Lg2C8",
  },
];

function Personalised(props) {
  const [userRatings, setUserRatings] = useState([3, 3, 3, 3]);
  const [playlist, setPlaylist] = useState([]);

  function handleClick() {
    fetch("http://localhost:8000/personalised", {
      method: "POST",
      body: JSON.stringify({ data: userRatings }),
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPlaylist(data.tracks);
      });
  }

  return (
    <div className='personalisedContainer'>
      <h1>Get your personalised playlist</h1>
      <p>Rate the following songs</p>
      <div className='popularFlex'>
        {songs.map((song, index) => {
          return (
            <SongOption
              song={song}
              key={index}
              userRatings={userRatings}
              setUserRatings={setUserRatings}
              index={index}
            />
          );
        })}
      </div>
      <button className='personalisedButton' onClick={handleClick}>
        Submit
      </button>

      {playlist.length > 0 && (
        <>
          <h1 className='title'>Your playlist</h1>
          <div className='playlistContainer'>
            {playlist.map((song, index) => {
              return <RecommendedSong key={index} song={song} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Personalised;
