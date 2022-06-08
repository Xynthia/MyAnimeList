import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Profile } from "./Profile";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Home } from "./Home";
import { Anime } from "./Anime";

function App() {
  const [AnimeData, setAnimeData] = useState([]);

  const [TopAnimeData, setTopAnimeData] = useState([]);

  const [status, setStatus] = useState([]);

  const [id, setId] = useState(1);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/anime`)
      .then((response) => response.json())
      .then((data) => {
        setTopAnimeData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="Container">
        <Routes>
          <Route
            path="/"
            element={<Home TopAnimeData={TopAnimeData} id={id} setId={setId} />}
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/Anime"
            element={<Anime AnimeData={AnimeData} setStatus={setStatus} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
