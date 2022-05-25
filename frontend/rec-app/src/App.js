import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Browse from "./Components/browse/";
import Popular from "./Components/popular";
import Personalised from "./Components/personalised";
import "./App.css";
function App() {
  const [option, setOption] = useState("popular");
  const [songs, setSongs] = useState([]);
  return (
    <div className='main'>
      <div className='sidebar'>
        <Sidebar option={option} setOption={setOption} />
      </div>
      <div className='mainScreen'>
        {option === "popular" && (
          <Popular setOption={setOption} setSongs={setSongs} />
        )}
        {option === "browse" && <Browse songs={songs} setSongs={setSongs} />}
        {option === "personalised" && <Personalised />}
      </div>
    </div>
  );
}

export default App;
