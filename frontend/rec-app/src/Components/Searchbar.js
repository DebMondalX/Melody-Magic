import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { increment_searches_count } from "../Functions/incrementSearchesCount";
import { songs } from "../utils/songs";
import "../App.css";

function Searchbar(props) {
  const [selectedSong, setSelectedSong] = useState("");
  const [query, setQuery] = useState("");

  const filteredSong =
    query === ""
      ? songs.slice(0, 5)
      : songs
          .filter(song => {
            return song.name.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 5);

  async function handleClick() {
    increment_searches_count(selectedSong.id);
    fetch(`${process.env.REACT_APP_SERVER_URL}recommend`, {
      method: "POST",
      body: JSON.stringify({
        id: selectedSong.id,
        name: selectedSong.name,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        props.setSongs(data.tracks);

        console.log(data);
      });
  }

  return (
    <div className='searchContainer'>
      <Combobox value={selectedSong} onChange={setSelectedSong}>
        <Combobox.Input
          className='searchbar'
          onChange={event => setQuery(event.target.value)}
          displayValue={song => song.name}
        />
        <button type='submit' className='submit' onClick={handleClick}>
          Go
        </button>

        {filteredSong.length === 0 && query !== "" ? null : (
          <Combobox.Options className='searchOptions'>
            {filteredSong.map(song => (
              <Combobox.Option key={song.id} value={song}>
                {song.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}

export default Searchbar;
