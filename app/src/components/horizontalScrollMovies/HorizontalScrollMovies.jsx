import style from "./HorizontalScrollMovies.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import { Movie, People, Settings, Logout, AccountCircle } from '@mui/icons-material';
import { useNavigate } from "react-router";
import MovieIcon from "../movieIcon/MovieIcon";
import { CircularProgress } from "@mui/material";

function HorizontalScrollMovies({ label, movies = {} }) {

  return (
    <div className={style.divHorizontalScroll}>
      <div className={style.label}>{label}</div>
      {movies.length == 0 && <div className={style.charge}>
        <CircularProgress color="inherit" size="3rem" />
      </div>}
      {movies.length && < div className={style.horizontalScroll}>
        {movies.map((movie, index) => <MovieIcon key={index} movie={movie} color={index % 12} />)}
      </div>}
    </div >
  );
}

export default HorizontalScrollMovies;