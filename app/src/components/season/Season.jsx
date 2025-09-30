import { RemoveRedEyeOutlined } from "@mui/icons-material";
import style from "./Season.module.css";
import { useNavigate } from "react-router";


function Season({ season, date, poster, id, see=true}) {
  const navigate = useNavigate()

  const onClickHandlerMovie = () => {
    navigate(`/movie/${id}`);
  }

  return (
    <div className={`${style.movieIcon}`} onClick={onClickHandlerMovie}>
      {see && <div className={`${style.see}`}><RemoveRedEyeOutlined sx={{fontSize:20}}/></div>}
      <img className={style.poster} src={poster}/>
      <p className={style.movieName}>Saison {season}</p>
      <p className={style.movieDate}>{date}</p>
    </div>
  );
}

export default Season;