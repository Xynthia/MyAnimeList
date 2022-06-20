import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import db from "./firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
export function Profile({ user }) {
  let navigate = useNavigate();
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

  const deleteAccount = async () => {
    const q = query(collection(db, "users"), where("username", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((userDoc) => {
      deleteDoc(doc(db, "users", userDoc.id));
    });
    await deleteUser(user);
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
              return (
                Array.isArray(anime.anime) &&
                anime?.anime?.map((animeInfo) => (
                  <div className="animeInfo" key={animeInfo.mal_id}>
                    <p>
                      {animeInfo.mal_id} && {animeInfo.status} &&{" "}
                      {anime.username}
                    </p>
                  </div>
                ))
              );
            })}
          </div>
        </div>
        <div className="deleteAccount">
          <Button
            sx={{ marginRight: "10px" }}
            variant="outlined"
            onClick={() => {
              deleteAccount();
              navigate("/");
            }}
          >
            Delete Profile
          </Button>
        </div>
      </main>
    </>
  );
}
