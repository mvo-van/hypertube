import style from "./FeedMovies.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import { Movie, People, Settings, Logout, AccountCircle } from '@mui/icons-material';
import { useNavigate } from "react-router";
import MovieIcon from "../movieIcon/MovieIcon";
import { CircularProgress } from "@mui/material";

function FeedMovies({ movies = {} }) {

  return (
    <div className={style.divVerticalScroll}>
      {movies.map((movie, index) => <MovieIcon key={index} movie={movie} color={index % 12} />)}
    </div>

  );
}

export default FeedMovies;