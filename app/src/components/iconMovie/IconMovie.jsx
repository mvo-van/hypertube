import style from "./IconMovie.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useEffect, useState } from "react";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import favicon from '../../assets/images/logo.png'
import { CircularProgress } from "@mui/material";

function IconMovie({ type = "movie", imdb_id = null, download = {}, see = true, like = true, onClickStart = {}, onClickSee = {}, onClickDownload = {}, onClickLike = {} }) {
  const [cisrcularOn, setCircularOn] = useState(false)
  const circularStart = () => {
    setCircularOn(true)
    onClickDownload()
  }
  useEffect(() => {
    setCircularOn((type == "movie") && download.exists && (download.status == "start" || download.status == "pending"))
  }, [download])
  return (
    <div className={`${style.divIconMovie}`} >
      {(type == "movie") && imdb_id && download.exists && (download.status == "downloading" || download.status == "finished") &&
        < button className={style.iconButton} onClick={onClickStart}>
          <img src={favicon} className={`${style.imgButton} ${style.iconeSize}`} alt="favicon" />
        </button>
      }

      {
        (type == "movie") && cisrcularOn &&
        <CircularProgress color="inherit" size="2rem" />
      }

      {
        (type == "movie") && !download.exists && !cisrcularOn &&
        <button className={style.iconButton} onClick={circularStart}>
          <FileDownloadOutlinedIcon className={style.iconeSize} fontSize="large" />
        </button>
      }

      {
        (type != "serie") &&
        <button className={style.iconButton} onClick={onClickSee}>
          <DoneOutlinedIcon className={style[`${see}`]} fontSize="large" />
        </button>
      }

      <button className={style.iconButton} onClick={onClickLike}>
        <FavoriteOutlinedIcon className={style[`${like}`]} fontSize="large" />
      </button>

    </div >
  );
}

export default IconMovie;