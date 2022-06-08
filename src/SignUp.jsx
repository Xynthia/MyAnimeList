import { auth } from "./firebase.config";
import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavBar } from "./NavBar";

export function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
                onClick={() =>
                  createUserWithEmailAndPassword(auth, email, password)
                }
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
