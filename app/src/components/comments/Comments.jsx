import CommentDiv from "../commentDiv/CommentDiv";
import style from "./Comments.module.css";
import { useNavigate } from "react-router";


function Comments({ comments, color=0, movieIcon=true }) {

  console.log(comments)
  return (
    <div className={style.Allcomments}>
      {comments.length && <div className={`${style.title} ${style[`title__color_${color}`]}`}>Commentaires :</div>}
      {comments.map((comment, index) => <CommentDiv key={comment.commentId} comment={comment} color={(color+index)%12} movieIcon={movieIcon}/>)}
    </div>
  );
}

export default Comments;