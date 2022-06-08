import React from "react";
import { NavBar } from "./NavBar";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const Anime = ({ AnimeData }, { setStatus }) => {
  const handleChange = (event) => {
    setStatus(event.target.value);
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

        <Button variant="outlined" style={{ marginTop: 5 }} onClick={() => {}}>
          Add to list
        </Button>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={"PlanToWatch"}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value={"PlanToWatch"}>Plan to watch</MenuItem>
            <MenuItem value={"Watching"}>Watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Dropped"}>Dropped</MenuItem>
          </Select>
        </FormControl>
      </main>
    </>
  );
};
