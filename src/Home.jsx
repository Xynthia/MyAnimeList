import React from "react";
import { Paper, ImageListItemBar, ImageListItem } from "@mui/material";
import Carousel from "react-multi-carousel";
import { NavBar } from "./NavBar";
import { useNavigate } from "react-router-dom";

export function Home({ TopAnimeData, id, setId }) {
  let navigate = useNavigate();
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
            {TopAnimeData.map((anime, key) => {
              return (
                <ImageListItem key={anime.images.jpg.image_url}>
                  <Paper
                    elevation={3}
                    sx={{
                      width: "min-content",
                      height: "min-content",
                      padding: "5px",
                    }}
                    onClick={() => {
                      setId(anime.mal_id);
                      navigate("/Anime");
                    }}
                  >
                    <img src={anime.images.jpg.image_url} alt="" height="270" />
                    <ImageListItemBar title={anime.title}></ImageListItemBar>
                  </Paper>
                </ImageListItem>
              );
            })}
          </Carousel>
        </div>
      </main>
    </>
  );
}
