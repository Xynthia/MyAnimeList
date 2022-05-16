import "./App.css";
import db from "./firebase.config";
import React, { useEffect, useState } from "react";

function App() {
  const [AnimeData, setAnimeData] = useState([]);
  const [id, setId] = useState([]);

  const handelChange = (id) => {
    setId(id ? id : "1");
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="Container">
        <main>
          <input
            type="number"
            value={id}
            onChange={(e) => handelChange(e.target.value)}
          />
          {AnimeData &&
            AnimeData.map((anime, key) => {
              console.log(anime);
            })}
        </main>
      </div>
    </>
  );
}

export default App;
