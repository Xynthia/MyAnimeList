import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "./firebase.config";
import { addDoc, collection } from "firebase/firestore";

export const Anime = ({ AnimeData }) => {
  const [user, setUser] = useState(); //Needed to lookup specific firebase user. If user us null (user == null) then user is not logged in.

  //To get the user id from the firebase auth. use the propertu user.uid.
  //E.g. console.log(user.uid). You can use this to querry and get firebase data.

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user)); //Send a request to firebase to get the current user. Returns null if not logged in.
  }, []);

  const [status, setStatus] = useState("Watching"); //These should be set by requesting firebase. and looking if the user has this anime in its "anime watch list". so the array of objects that contain the id and status (  [{mal_id:200, status: "Watching"} ). If it return data. set these 2 states. If it returns null (not found) set isWatching to false / leave default values.
  const [isWatching, setIsWatching] = useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const addAnime = async () => {
    setIsWatching(true);
    await addDoc(collection(db, "users"), {
      test: "test",
    });
    console.log("hi");
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

        {isWatching ? (
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
            onClick={addAnime}
          >
            Add to list
          </Button>
        )}
      </main>
    </>
  );
};
