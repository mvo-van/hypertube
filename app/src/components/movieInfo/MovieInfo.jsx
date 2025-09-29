import style from "./MovieInfo.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import IconMovie from "../iconMovie/IconMovie";
import { useState } from "react";


function MovieInfo({ movie={}}) {
  const navigate = useNavigate()
  const [see, setSee] = useState(movie.see)
  const [download, setDownload] = useState(movie.download)
  const [like, setLike] = useState(movie.like)
  
  const onClickStart = () => {

  }

  const onClickSee = () => {
    if(see == false){
      setSee(true)
    }
  }

  const onClickDownload = () => {
    
  }

  const onClickLike = () => {
    setLike(!like)
  }

  return (
    <div className={`${style.movieInfo}`}>
      <div className={style.banner} ><img className={style.imgBanner} src={movie.banner}/></div>
      <div className={style.divAllInfo}>
        <img className={style.imgMovie} src={movie.poster}/>
        <div className={style.infosDiv}>
          <div className={style.firstLine}>
            <div className={style.movieName}>{movie.name}</div>
            <IconMovie see={see} download={download} like={like} onClickStart={onClickStart} onClickSee={onClickSee} onClickDownload={onClickDownload} onClickLike={onClickLike}/>
          </div>
          {movie.type == "episode" && <div className={style.seasonDiv}>Saison 1 episode 1</div>}
          {movie.type == "season" && <div className={style.seasonDiv}>Saison 1</div>}
          {(movie.type == "episode" || movie.type == "movie") && <div className={style.divTime}>2022 1h48m 4/5</div>}
          {(movie.type == "serie") && <div className={style.divTime}>2022- 2 saison 8,7/10</div>}
          {(movie.type == "season") && <div className={style.divTime}>2022 9 épisodes 8,5/10</div>}
          <div className={style.bio}>{movie.bio}</div>

          <div className={style.subDivInfo}>
            <pre className={style.infos}><span className={style.titleInfos}>Genre             </span>Aventure, Comédie, Famille, Science Fiction</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Réalisateur     </span>Dean Fleischer Camp</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Scénariste      </span>Chris Kekanio, kalani Bright, Mike Van Waes, Chris Sanders</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Studio            </span>Blue Koala Pictures, Inc., Rideback, Walt Disney Pictures</pre>
            <pre className={style.infos}><span className={style.titleInfos}>Distribution    </span>Maia Kealoha, Sydney Elizabeth Agudong, Courtney B. Vance </pre>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieInfo;