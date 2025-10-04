import style from "./Header.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import {Movie, People, Settings, Logout, AccountCircle} from '@mui/icons-material';
import { useNavigate } from "react-router";

function Header({}) {
  const img = null
  const navigate = useNavigate()


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
      <div className={style.title}>Hypertube</div>
      <div className={style.menu}>
        <Movie sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerMovie}/>
        <People sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerUsers}/>
        {img && <IconButton src={iconPseudo} label="Pseudo" color="blue" onClick={onClickHandlerMe}/>} {/*TODO css quand on a image */}
        {!img && <AccountCircle sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerMe}/>}
        <Settings sx={{ fontSize: 35 , color:"#ffffff"}} onClick={onClickHandlerSettings}/>
        <Logout sx={{ fontSize: 35 , color:"#EB7879"}} onClick={onClickHandlerQuit}/>
      </div>
    </div>
  );
}

export default Header;