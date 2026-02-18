import style from "./CommentDiv.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";


function CommentDiv({ comment, movieIcon = true, color = 0 }) {
  const navigate = useNavigate()

  const onClickHandlerIconMovie = () => {
    if (comment.movieType == "movie") {
      navigate(`/movie/${comment.movieId}`);
    } if (comment.movieType == "episode") {
      navigate(`/serie/${comment.serieId}/season/${comment.seasonId}/episode/${comment.episodeId}`);
    }
  }
  const onClickHandlerIconUser = () => {
    navigate(`/user/${comment.userId}`);
  }
  return (
    <div className={`${style.divComment}`} >
      <div className={`${style[`movieIcone_${movieIcon}`]} `}>
        {movieIcon && <img onClick={onClickHandlerIconMovie} className={style.imgMovie} src={comment.urlImg} />}
        {!movieIcon && <img onClick={onClickHandlerIconUser} className={style.imgUser} src={comment.imgUser} />}
      </div>

      <div className={`${style.divMessage}`}>
        {!movieIcon && <p className={style.name}>{comment.userName}</p>}
        <p className={style.message}>{comment.message}</p>
        <div className={`${style.line}`} />

      </div>
    </div>
  );
}

export default CommentDiv;