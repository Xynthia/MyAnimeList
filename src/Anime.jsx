import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import db, { auth } from "./firebase.config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const Anime = ({ AnimeData, id, user }) => {
  const [status, setStatus] = useState("Watching"); //These should be set by requesting firebase. and looking if the user has this anime in its "anime watch list". so the array of objects that contain the id and status (  [{mal_id:200, status: "Watching"} ). If it return data. set these 2 states. If it returns null (not found) set isWatching to false / leave default values.
  const [isWatching, setIsWatching] = useState(false);

  const handleStatusChange = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  useEffect(() => {
    const q = query(collection(db, "users"), where("username", "==", user.uid));
    getDocs(q).then((querySnapshot) =>
      querySnapshot.forEach((userDoc) => {
        setIsWatching(userDoc.data()?.anime.some((a) => a.mal_id == id));
        setStatus(userDoc.data()?.anime.find((x) => x.mal_id == id).status);
      })
    );
  }, []);

  useEffect(() => {
    if (isWatching) updateAnime();
  }, [status]);

  const updateAnime = async () => {
    setIsWatching(true);
    const q = query(collection(db, "users"), where("username", "==", user.uid));

    let UserData = {};

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((userDoc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(userDoc.id, " => ", userDoc.data());

      UserData = { id: userDoc.id, ...userDoc.data() };

      setDoc(
        doc(db, "users", UserData.id),
        {
          anime: [
            { mal_id: id, status: status },
            ...UserData?.anime.filter((a) => a.mal_id != id),
          ],
        },
        { merge: true }
      );
    });
  };

  return (
    <>
      <NavBar />
      <main>
        <div className="title">{AnimeData.title}</div>
        <div
          className="animeInfo"
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
          <img
            src={AnimeData.images.jpg.image_url}
            alt=""
            height="270"
            style={{ marginTop: 5 }}
          />
          {AnimeData.synopsis}
        </div>

        {user !== null &&
          (isWatching ? (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={status}
                onChange={
                  handleStatusChange /* Here the same should be done as on the button click below, but it should look if it already exists. if so, only update. if it doesnt, create new object with that mal_id and status*/
                }
                label="Status"
              >
                <MenuItem value={"Watching"}>Watching</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"OnHold"}>On Hold</MenuItem>
                <MenuItem value={"PlanToWatch"}>Plan To Watch</MenuItem>
                <MenuItem value={"Dropped"}>Dropped</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Button
              variant="outlined"
              style={{ marginTop: 5 }}
              onClick={() => {
                setIsWatching(true);
                setStatus("Watching");
              }}
            >
              Add to list
            </Button>
          ))}
      </main>
    </>
  );
};
