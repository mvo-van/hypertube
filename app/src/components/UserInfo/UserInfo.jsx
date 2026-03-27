import style from "./UserInfo.module.css";
import imageSee from "../../assets/images/see.png"
import { useNavigate } from "react-router";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function UserInfo({ user = {}, me = false }) {
  const navigate = useNavigate()

  const onClickHandlerModify = () => {
    navigate(`/settings`);
  }

  return (
    <div className={`${style.userInfo} ${style[`userIcon__color_${user.id % 12}`]}`}>
      <div className={style.divAllInfo}>
        <img className={style.imgUser} src={user.urlImg} />
        <div className={style.infosDiv}>
          <div className={style.pseudo}>{user.pseudo} {me && <BorderColorIcon onClick={onClickHandlerModify} className={style.modify} />}</div>
          <div className={style.subDivInfo}>
            <div className={style.infos}>Films et saisons vus : {user.moviesCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;