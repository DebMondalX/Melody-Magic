import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <img
      className='logo'
      src='/logo.webp'
      alt='Melody Magic logo'
      width='150px'
      height='75px'
    />
  </React.StrictMode>
);
