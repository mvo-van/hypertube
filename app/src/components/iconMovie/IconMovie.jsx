import style from "./IconMovie.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useState } from "react";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import favicon from '../../assets/images/logo.png'

function IconMovie({ type="movie", download=true, see=true, like=true, onClickStart={}, onClickSee={}, onClickDownload={}, onClickLike={}}) {
  const [isLike, setLike] = useState(like)

  const onClickHandlerIconMovie = () => {

  }
  return (
    <div className={`${style.divIconMovie}`} >
    {type == "movie" && download && 
      <button className={style.iconButton} onClick={onClickStart}>
        <img src={favicon} className={`${style.imgButton} ${style.iconeSize}`} alt="favicon" />
      </button>
    }

    {type == "movie" && !download &&     
      <button className={style.iconButton} onClick={onClickDownload}>
        <FileDownloadOutlinedIcon className={style.iconeSize} fontSize="large"/>
      </button> 
    }


    <button className={style.iconButton} onClick={onClickSee}>
      <DoneOutlinedIcon className={style[`${see}`]} fontSize="large"/>
    </button>

    <button className={style.iconButton} onClick={onClickLike}>
      <FavoriteOutlinedIcon className={style[`${like}`]} fontSize="large"/>
    </button>

      {/* <div onClick={onClickHandlerIconMovie} className={`${style[`movieIcone_${movieIcon}`]} `}>{movieIcon && <img className={style.imgMovie} src={comment.urlImg}/>}{!movieIcon && <img className={style.imgUser} src={comment.imgUser}/>}</div>
      
      <div className={`${style.divMessage}`}>
        {!movieIcon && <p className={style.name}>{comment.userName}</p>}
        <p className={style.message}>{comment.message}</p>
        <div className={`${style.line}`}/>

      </div> */}
    </div>
  );
}

export default IconMovie;