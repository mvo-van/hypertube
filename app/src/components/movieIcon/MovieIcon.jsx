import style from "./MovieIcon.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import { RemoveRedEyeOutlined } from "@mui/icons-material";


function MovieIcon({ movie, color=0 }) {
  const navigate = useNavigate()

  const onClickHandlerMovie = () => {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className={`${style.movieIcon}`} onClick={onClickHandlerMovie}>
      {movie.see && <div className={`${style.see}`}><RemoveRedEyeOutlined sx={{fontSize:20}}/></div>}
      <img className={style.poster} src={movie.urlImg}/>
      <p className={style.movieName}>{movie.name}</p>
      <p className={style.movieDate}>{movie.date}</p>
    </div>
  );
}

export default MovieIcon;