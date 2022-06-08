import { auth } from "./firebase.config";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export function NavBar() {
  let navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return (
    <nav>
      <Button
        variant="text"
        onClick={() => {
          navigate("/");
        }}
      >
        My Anime List
      </Button>
      <div className="rightButton">
        {user == null ? (
          <>
            <Button
              sx={{ marginRight: "10px" }}
              variant="outlined"
              onClick={() => {
                navigate("/Login");
              }}
            >
              login
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              signup
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ marginRight: "10px" }}
              variant="outlined"
              onClick={() => {
                navigate("/Profile");
              }}
            >
              Profile
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                signOut(auth);
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
