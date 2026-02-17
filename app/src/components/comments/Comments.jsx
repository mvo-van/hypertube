import CommentDiv from "../commentDiv/CommentDiv";
import CommentForm from "../commentForm/CommentForm";
import style from "./Comments.module.css";
import { useNavigate } from "react-router";

function Comments({ comments, color = 0, movieIcon = true, commentForm = true, onMessageSubmit = {}, onMessageHeandler = {}, message = "" }) {

  return (
    <div className={style.Allcomments}>
      <div className={`${style.line}`} />
      <div className={`${style.title}`}>Commantaires</div>
      {commentForm && <CommentForm onMessageSubmit={onMessageSubmit} onMessageHeandler={onMessageHeandler} message={message} />}
      {comments.map((comment, index) => <CommentDiv key={comment.id} comment={comment} color={(color + index) % 12} movieIcon={movieIcon} />)}
    </div>
  );
}

export default Comments;