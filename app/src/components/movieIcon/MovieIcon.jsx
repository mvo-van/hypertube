import style from "./MovieIcon.module.css";
import imageSee from "../../assets/images/see.png"
function MovieIcon({ movie }) {
  console.log(movie)
  return (
    <div className={style.movieIcon}>
      {movie.see && <div className={style.see}><img className={style.notif} src={imageSee}/></div>}
      <img className={style.poster} src={movie.urlImg}/>
        <p className={style.movieName}>{movie.name} lkfjslqkjf skjf lkjqlkjf lkj mlskqjf slkjflksjsf lkjlsdkjklfj qlksjfldskqj qlkjsdflkjq</p>
    </div>
  );
}

export default MovieIcon;