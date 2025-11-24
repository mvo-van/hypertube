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
      {/* <div className={style.divInfo}> */}
        <img className={style.imgUser} src={user.urlImg}/>
        <p className={style.userName}>{user.name}</p>
      {/* </div> */}
    </div>
  );
}

export default UserIcon;