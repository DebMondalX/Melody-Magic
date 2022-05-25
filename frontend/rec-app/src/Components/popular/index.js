import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import PopularSongs from "./PopularSongs";
import "../../App.css";

function Popular(props) {
  const [popularSongs, setPopularSongs] = useState([]);
  async function getPopularSongs() {
    const { data } = await supabase
      .from("song_recommendations")
      .select("song_id")
      .order("searches_count", { ascending: false })
      .limit(10);
    const songIds = getSongId(data);
    getSpotifyData(songIds);
  }
  function getSongId(data) {
    const idArray = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index].song_id;
      idArray.push(element);
    }
    return idArray;
  }
  function getSpotifyData(songIdsArray) {
    fetch(`http://localhost:8000/popular`, {
      method: "POST",
      body: JSON.stringify({
        songIds: songIdsArray,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        setPopularSongs(data.tracks);
      });
  }
  useEffect(() => {
    getPopularSongs();
  }, []);
  return (
    <div className='popularContainer'>
      <h1 className='popularHeader'>Popular Now</h1>
      <div className='popularFlex'>
        {popularSongs.map((song, index) => {
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
