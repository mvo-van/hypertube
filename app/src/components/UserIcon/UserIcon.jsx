import style from "./UserIcon.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";


function UserIcon({ user, color=0 }) {
  const navigate = useNavigate()

  const onClickHandlerUser = () => {
    navigate(`/user/${user.id}`);
  }

  return (
    <div className={`${style.userIcon}`} onClick={onClickHandlerUser}>
        {user.urlImg && <img className={style.imgUser} src={user.urlImg}/>}
        {!user.urlImg && <img className={style.imgUser} src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"/>}
        <p className={style.userName}>{user.name}</p>
    </div>
  );
}

export default UserIcon;