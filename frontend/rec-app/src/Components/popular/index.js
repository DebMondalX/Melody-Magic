import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import PopularSongs from "./PopularSongs";
import "../../App.css";

function Popular(props) {
  const [popularSongs, setPopularSongs] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  async function getPopularSongs() {
    const { data } = await supabase
      .from("song_recommendations")
      .select("song_id")
      .order("searches_count", { ascending: false })
      .limit(5);
    const songIds = getSongId(data);
    getSpotifyData(songIds, setPopularSongs);
  }

  async function getRandomSongs() {
    let { data, error } = await supabase.rpc("get_random_song_ids");

    if (error) console.error(error);
    else {
      const songIds = getSongId(data);
      getSpotifyData(songIds, setRandomSongs);
    }
  }

  function getSongId(data) {
    const idArray = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index].song_id;
      idArray.push(element);
    }
    return idArray;
  }

  function getSpotifyData(songIdsArray, updateState) {
    fetch(`${process.env.REACT_APP_SERVER_URL}popular`, {
      method: "POST",
      body: JSON.stringify({
        songIds: songIdsArray,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        updateState(data.tracks);
        console.log(data.tracks);
      });
  }

  useEffect(() => {
    getPopularSongs();
    getRandomSongs();
  }, []);

  return (
    <div className='popularContainer'>
      <h1 className='popularHeader'>Popular now</h1>
      <div className='popularFlex'>
        {popularSongs.map(song => {
          return (
            <PopularSongs
              key={song.id}
              song={song}
              setOption={props.setOption}
              setSongs={props.setSongs}
            />
          );
        })}
      </div>

      <h1 className='popularHeader'>Try out new songs</h1>
      <div className='popularFlex'>
        {randomSongs.map(song => {
          return (
            <PopularSongs
              key={song.id}
              song={song}
              setOption={props.setOption}
              setSongs={props.setSongs}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Popular;
