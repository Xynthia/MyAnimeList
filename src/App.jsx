import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Profile } from "./Profile";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { Home } from "./Home";
import { Anime } from "./Anime";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

function App() {
  const [AnimeData, setAnimeData] = useState([]);

  const [TopAnimeData, setTopAnimeData] = useState([]);

  const [id, setId] = useState(1);

  const [user, setUser] = useState(); //Needed to lookup specific firebase user. If user us null (user == null) then user is not logged in.

  //To get the user id from the firebase auth. use the propertu user.uid.
  //E.g. console.log(user.uid). You can use this to querry and get firebase data.

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user)); //Send a request to firebase to get the current user. Returns null if not logged in.
  }, []);

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
          <Route path="/SignUp" element={<SignUp user={user} />} />
          <Route path="/Profile" element={<Profile user={user} />} />
          <Route
            path="/Anime"
            element={<Anime AnimeData={AnimeData} id={id} user={user} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
