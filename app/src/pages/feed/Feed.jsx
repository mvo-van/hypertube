import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import Search from "../../components/search/Search";

function Feed() {
  const [movies, setMovies] = useState([{"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
  ]);
  console.log(movies[0].name)
  console.log("url",movies[0].urlImg)

  return (
    <GenericPage>
      <Header />
      <Search open={true} />
      <HorizontalScrollMovies movies={movies} label="Top 10 - Films les plus populaires"/>
      <HorizontalScrollMovies movies={movies} label="Top 10 - Series les plus populaires"/>

    </GenericPage>
  );
}

export default Feed;
