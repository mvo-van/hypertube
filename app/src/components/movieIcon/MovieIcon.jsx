import style from "./MovieIcon.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";


function MovieIcon({ movie, color=0 }) {
    const navigate = useNavigate()

    const onClickHandlerMovie = () => {
            navigate(`/movie/${movie.id}`);
       }
    
  console.log(movie)
  return (
    <div className={`${style.movieIcon} ${style[`movieIcon__color_${color}`]}`} onClick={onClickHandlerMovie}>
      {movie.see && <div className={`${style.see} ${style[`see__color_${color}`]}`}><img className={style.notif} src={imageSee}/></div>}
      <img className={style.poster} src={movie.urlImg}/>
        <p className={style.movieName}>{movie.name}</p>
    </div>
  );
}

export default MovieIcon;