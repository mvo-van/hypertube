import style from "./MovieInfo.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import IconMovie from "../iconMovie/IconMovie";
import { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { api } from "../../common/api";

const getMovieId = (movie) => {
  if (movie.type == "movie" || movie.type == "serie") {
    return `${movie.id}`
  }
  if (movie.type == "season") {
    return `${movie.serie_id}_${movie.season}`
  }
  if (movie.type == "episode") {
    return `${movie.serie_id}_${movie.season}_${movie.episode}`
  }
}

function MovieInfo({ movie = {} }) {
  const navigate = useNavigate()
  const [see, setSee] = useState(movie.see)
  const [download, setDownload] = useState(movie.download)
  const [like, setLike] = useState(movie.like)
  const movieId = getMovieId(movie)
  const onClickStart = () => {

  }

  const onClickSee = async () => {
    if (see == false) {
      try {
        await api.post(`/watched/addWatch`, {
          "movieType": movie.type,
          "movie_id": movieId
        });
        setSee(true)
      } catch (e) {

      }
    }
  }

  const onClickDownload = () => {

  }

  const onClickLike = async () => {
    try {
      if (like) {
        await api.delete(`/likes/oneMovie`, {
          data: {
            type: movie.type,
            movie_id: movieId
          }
        });
      } else {
        await api.post(`/likes`, {
          type: movie.type,
          movie_id: movieId
        });
      }
      setLike(!like)
    } catch (e) {
    }
  }

  return (
    <div className={`${style.movieInfo}`}>
      <div className={style.banner} ><img className={style.imgBanner} src={movie.banner} /></div>
      <div className={style.divAllInfo}>
        <img className={style.imgMovie} src={movie.poster} />
        <div className={style.infosDiv}>
          <div className={style.firstLine}>
            <div className={style.movieName}>{movie.name}</div>
            <IconMovie type={movie.type} see={see} download={download} like={like} onClickStart={onClickStart} onClickSee={onClickSee} onClickDownload={onClickDownload} onClickLike={onClickLike} />
          </div>
          {movie.type == "episode" && <div className={style.seasonDiv}>{movie.episode_name}</div>}
          {movie.type == "episode" && <div className={style.seasonDiv}>Saison {movie.season} Episode {movie.episode}</div>}
          {movie.type == "season" && <div className={style.seasonDiv}>Saison {movie.season}</div>}
          {(movie.type == "episode" || movie.type == "movie") && <div className={style.divTime}>{movie.date} {movie.time}m {movie.note}/10<StarIcon sx={{ fontSize: 21 }} /></div>}
          {(movie.type == "serie") && <div className={style.divTime}>{movie.dateStart}-{movie.dateEnd} {movie.nbrseasons} saison {movie.note}/10<StarIcon sx={{ fontSize: 21 }} /></div>}
          {(movie.type == "season") && <div className={style.divTime}>{movie.date} {movie.nbrEpisodes} épisodes {movie.note}/10<StarIcon sx={{ fontSize: 21 }} /></div>}
          <div className={style.bio}>{movie.synopsis}</div>

          <div className={style.subDivInfo}>
            <pre className={style.infos}><span className={style.titleInfos}>Genre             </span>{movie.genres && movie.genres.join(", ")}</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Réalisation     </span>{movie.producers && movie.producers.join(", ")}</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Scénariste      </span>{movie.screenwriters && movie.screenwriters.join(", ")}</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Studio            </span>{movie.studios && movie.studios.join(", ")}</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Distribution    </span>{movie.actors && movie.actors.join(", ")} </pre>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieInfo;