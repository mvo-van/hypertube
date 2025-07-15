import style from "./UserInfo.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";


function UserInfo({ user={}, me=false}) {
  const navigate = useNavigate()

  const onClickHandlerUser = () => {
    navigate(`/user/${user.id}`);
  }
    
  console.log(user)
  return (
    <div className={`${style.userInfo} ${style[`userIcon__color_${user.id%12}`]}`} onClick={onClickHandlerUser}>
      <div className={style.divAllInfo}>
        <img className={style.imgUser} src={user.urlImg}/>
        <div className={style.infosDiv}>
          <div className={style.pseudo}>{user.pseudo}</div>
          <div className={style.subDivInfo}>
            <div className={style.infos}>Prenom :  {user.firstName}</div>
            <div className={style.infos}>Nom : {user.lastName}</div>
            <div className={style.infos}> Films vu : {user.moviesNumber}</div>
            <div className={style.infos}>Episodes vu : {user.seriesNumber}</div>
            {me && <div></div>}
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserInfo;