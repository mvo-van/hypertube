import styles from "./CommentForm.module.css";
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

function CommentForm({ comments, onMessageSubmit = {}, onMessageHeandler = {}, message = "" }) {

  return (
    <form className={styles.form} onSubmit={onMessageSubmit}>
      <input type="textarea" className={styles.inputChat} value={message} onChange={onMessageHeandler} />
      <button
        type="submit"
        className={styles.buttonChat}>
        <NearMeOutlinedIcon className={styles.icon} fontSize="large" />
      </button>
    </form>
  );
}

export default CommentForm;