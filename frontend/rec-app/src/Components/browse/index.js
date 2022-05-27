import React from "react";
import Searchbar from "../Searchbar";
import SelectedSong from "./SelectedSong";
import Recommendedsong from "./RecommendedSong";
import "../../App.css";

//to search for songs
//and display the recommended songs
function Browse(props) {
  return (
    <div className='browseContainer'>
      <div className='searchWrapper'>
        <h1 className='firstTitle'>Browse songs</h1>
        <Searchbar setSongs={props.setSongs} />
      </div>

      {props.songs.length > 0 ? (
        <>
          <SelectedSong song={props.songs[0]} />

          <h1 className='title'>You might like these</h1>
          <div className='recommendations'>
            {props.songs.map((song, index) => {
              if (index > 0) {
                return (
                  <Recommendedsong
                    key={song.id}
                    song={song}
                    setSongs={props.setSongs}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Browse;
