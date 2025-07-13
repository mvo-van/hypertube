import style from "./CommentDiv.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";


function CommentDiv({ comment, movieIcon=true, color=0}) {
  const navigate = useNavigate()

  const onClickHandlerIconMovie = () => {
    navigate(`/movie/${comment.movieId}`);
  }
  return (
    <div className={`${style.divComment}`} >
      <div onClick={onClickHandlerIconMovie} className={`${style[`movieIcone_${movieIcon}`]} `}>{movieIcon && <img className={style.imgMovie} src={comment.urlImg}/>}</div>
      
      <div className={`${style.divMessage} ${style[`divComment__color_${color}`]}`}>
        <p className={style.message}>{comment.message}</p>
      </div>
    </div>
  );
}

export default CommentDiv;