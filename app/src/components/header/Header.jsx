import style from "./Header.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import {Movie, People, Settings, Logout, AccountCircle} from '@mui/icons-material';
import { useNavigate } from "react-router";

function Header({}) {
  const img = null
  const navigate = useNavigate()


  const onClickHandlerTitle = () => {
    navigate(`/feed`);
  }

  const onClickHandlerMovie = () => {
    navigate(`/feed`);
  }

  const onClickHandlerUsers = () => {
    navigate(`/users`);
  }

  const onClickHandlerMe = () => {
    // TODO
  }

  const onClickHandlerSettings = () => {
    navigate(`/settings`);
  }

  const onClickHandlerQuit = () => {
    // TODO
  }


  return (
    <div className={style.header}>
      <div className={style.title} onClick={onClickHandlerTitle}>Hypertube</div>
      <div className={style.menu}>
        <Movie sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerMovie} className={style.movie}/>
        <People sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerUsers} className={style.people}/>
        {img && <IconButton src={iconPseudo} label="Pseudo" color="blue" onClick={onClickHandlerMe} className={style.user}/>} {/*TODO css quand on a image */}
        {!img && <AccountCircle sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerMe} className={style.user}/>}
        <Settings sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerSettings} className={style.settings}/>
        <Logout sx={{ fontSize: 35 , color:"#EB7879"}} onClick={onClickHandlerQuit} className={style.logout}/>
      </div>
    </div>
  );
}

export default Header;