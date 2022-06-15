import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import db, { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs } from "firebase/firestore";

export function Profile() {
  const [AnimeList, setAnimeList] = useState([]);

  const getAnime = async () => {
    const data = await getDocs(collection(db, "users"));

    const animes = [];
    data.forEach((doc) => {
      console.log(doc.data());
      animes.push(doc.data());
    });
    setAnimeList(animes);
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="myList">
          <div className="title">
            <p>My List</p>
          </div>
          <div className="myList">
            {AnimeList.map((anime) => {
              anime.anime.map((animeInfo) => {
                console.log(animeInfo);
                return animeInfo.status;
              });
              return anime.username;
            })}
          </div>
        </div>
      </main>
    </>
  );
}
