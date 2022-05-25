import "./App.css";
import db, { auth } from "./firebase.config";
import { getDatabase, ref, onValue } from "firebase/database";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Paper,
  ImageListItemBar,
  ImageListItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const [AnimeData, setAnimeData] = useState([]);
  const [id, setId] = useState(1);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/anime`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  function NavBar() {
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
        </div>
      </nav>
    );
  }

  function Login() {
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
                  id="standard-basic"
                  label="wachtwoord"
                  variant="standard"
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    signInWithEmailAndPassword(auth, email, password);
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </div>
        </main>
      </>
    );
  }

  function SignUp() {
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

  function Profile() {
    return (
      <>
        <NavBar />
        <main></main>
      </>
    );
  }

  function Home() {
    return (
      <>
        <NavBar />
        <main>
          <div className="TopAnime">
            <div className="title">
              <p>Top Anime</p>
            </div>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 5,
                  partialVisibilityGutter: 20,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 3,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {
                /* {AnimeData?.background} */
                AnimeData.map((anime, key) => {
                  return (
                    <ImageListItem key={anime.images.jpg.image_url}>
                      <Paper
                        elevation={3}
                        sx={{
                          width: "min-content",
                          height: "min-content",
                          padding: "5px",
                        }}
                      >
                        <img
                          src={anime.images.jpg.image_url}
                          alt=""
                          height="270"
                        />
                        <ImageListItemBar
                          title={anime.title}
                        ></ImageListItemBar>
                      </Paper>
                    </ImageListItem>
                  );
                })
              }
            </Carousel>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
