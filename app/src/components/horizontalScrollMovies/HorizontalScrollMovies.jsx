import style from "./HorizontalScrollMovies.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import {Movie, People, Settings, Logout, AccountCircle} from '@mui/icons-material';
import { useNavigate } from "react-router";
import MovieIcon from "../movieIcon/MovieIcon";

function HorizontalScrollMovies({ label, movies={}}) {
  
  return (
    <div className={style.divHorizontalScroll}>
      <div className={style.label}>{label}</div>
      <div className={style.horizontalScroll}>
        {movies.map((movie, index) => <MovieIcon key={movie.name + movie.id} movie={movie} color={index%12}/>)}
      </div>
    </div>
  );
}

export default HorizontalScrollMovies;