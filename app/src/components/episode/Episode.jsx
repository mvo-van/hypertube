import { RemoveRedEyeOutlined } from "@mui/icons-material";
import style from "./Episode.module.css";
import { useNavigate } from "react-router";
import StarIcon from '@mui/icons-material/Star';

function Episode({ episode }) {
  const navigate = useNavigate()

  const onClickHandlerMovie = () => {
    navigate(`/serie/${episode.serie_id}/season/${episode.seasonNbr}/episode/${episode.episodeNbr}`);
  }

  return (
    <div className={`${style.episodeDiv}`} onClick={onClickHandlerMovie}>
      <div className={style.borderPoster}>
        {episode.see && <div className={`${style.see}`}><RemoveRedEyeOutlined sx={{ fontSize: 20 }} /></div>}
        <img className={style.banner} src={episode.poster} />
        {episode.start > 0 &&
          <div>
            <div className={style.totalLine} />
            <div className={style.seeLine} style={{ width: `${(episode.start / episode.time) * 209}px` }} />
          </div>
        }

      </div>

      <div className={style.infoDiv}>
        <p className={style.name}>{episode.episodeNbr}. {episode.title}</p>
        <p className={style.time}>{episode.time}m {episode.note}/10<StarIcon sx={{ fontSize: 17 }} /></p>
        <p className={style.synopsis}>{episode.synopsis}</p>
      </div>

    </div>
  );
}

export default Episode;