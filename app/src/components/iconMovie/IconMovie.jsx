import style from "./IconMovie.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useState } from "react";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import favicon from '../../assets/images/logo.png'

function IconMovie({ type="movie", download=true, see=true, like=true, onClickStart={}, onClickSee={}, onClickDownload={}, onClickLike={}}) {

  return (
    <div className={`${style.divIconMovie}`} >
    {(type == "movie" || type == "episode") && download && 
      <button className={style.iconButton} onClick={onClickStart}>
        <img src={favicon} className={`${style.imgButton} ${style.iconeSize}`} alt="favicon" />
      </button>
    }

    {(type == "movie" || type == "episode" || type == "season") && !download &&     
      <button className={style.iconButton} onClick={onClickDownload}>
        <FileDownloadOutlinedIcon className={style.iconeSize} fontSize="large"/>
      </button> 
    }

    {(type != "serie") &&
      <button className={style.iconButton} onClick={onClickSee}>
        <DoneOutlinedIcon className={style[`${see}`]} fontSize="large"/>
      </button>
    }

    <button className={style.iconButton} onClick={onClickLike}>
      <FavoriteOutlinedIcon className={style[`${like}`]} fontSize="large"/>
    </button>

    </div>
  );
}

export default IconMovie;