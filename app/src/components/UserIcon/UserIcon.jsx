import style from "./UserIcon.module.css";
import { useNavigate } from "react-router";
import userImage from "../../assets/images/userImage.png"


function UserIcon({ user, color = 0 }) {
  const navigate = useNavigate()

  const onClickHandlerUser = () => {
    navigate(`/user/${user.id}`);
  }

  return (
    <div className={`${style.userIcon}`} onClick={onClickHandlerUser}>
      {user.urlImg && <img className={style.imgUser} src={user.urlImg} />}
      {!user.urlImg && <img className={style.imgUser} src={userImage} />}
      <p className={style.userName}>{user.name}</p>
    </div>
  );
}

export default UserIcon;