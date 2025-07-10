import style from "./Comments.module.css";
import { useNavigate } from "react-router";


function Comments({ comments, color=0 }) {
  const navigate = useNavigate()

  const onClickHandlerUser = () => {
    navigate(`/movie/${comments.movieId}`);
  }
    
  console.log(comments)
  return (
    <div className={style.Allcomments} onClick={onClickHandlerUser}>
      {comments.length && <div>Commantaires :</div>}
    </div>
  );
}

export default Comments;