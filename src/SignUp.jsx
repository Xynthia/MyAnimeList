import db, { auth } from "./firebase.config";
import React, { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavBar } from "./NavBar";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function SignUp({ user }) {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const addAnimeDoc = async () => {
    console.log("user ", user);
    await addDoc(collection(db, "users"), {
      anime: [],
      username: user.uid,
    });
  };

  useEffect(() => {
    if (user !== undefined && user !== null) {
      console.log("user created!");
      addAnimeDoc();
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <main>
        <div className="loginForm">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={4}
            sx={{ padding: "10px" }}
          >
            <Grid item>
              <TextField
                required
                autoFocus
                id="standard-basic"
                label="email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                autoFocus
                id="standard-basic"
                label="wachtwoord"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  createUserWithEmailAndPassword(auth, email, password);
                }}
              >
                SignUp
              </Button>
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
}
