import style from "./Header.module.css";
import IconButton from "../button/IconButton";
import iconPseudo from "../../assets/images/me.png"
import { Movie, People, Settings, Logout, AccountCircle } from '@mui/icons-material';
import { useNavigate } from "react-router";
import { api } from "../../common/api";
import { useState, useEffect } from "react";

function Header({ }) {
  const img = null
  const navigate = useNavigate()
  const [myId, setMyId] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/connected");
      } catch (e) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const getId = async () => {
      try {
        const res = await api.get("/users/me");
        setMyId(res.data.id)
      } catch (e) {
      }
    };

    getId();
  }, []);

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
    navigate(`/user/` + myId);
  }

  const onClickHandlerSettings = () => {
    navigate(`/settings`);
  }

  const onClickHandlerQuit = async () => {
    try {
      await api.get("/auth/logout");
      navigate(`/`);
    } catch (e) {
    }
  };


  return (
    <div className={style.header}>
      <div className={style.title} onClick={onClickHandlerTitle}>Hypertube</div>
      <div className={style.menu}>
        <Movie sx={{ fontSize: 35, color: "#ffffff" }} onClick={onClickHandlerMovie} className={style.movie} />
        <People sx={{ fontSize: 35, color: "#ffffff" }} onClick={onClickHandlerUsers} className={style.people} />
        {img && <IconButton src={iconPseudo} label="Pseudo" color="blue" onClick={onClickHandlerMe} className={style.user} />} {/*TODO css quand on a image */}
        {!img && <AccountCircle sx={{ fontSize: 35, color: "#ffffff" }} onClick={onClickHandlerMe} className={style.user} />}
        <Settings sx={{ fontSize: 35, color: "#ffffff" }} onClick={onClickHandlerSettings} className={style.settings} />
        <Logout sx={{ fontSize: 35, color: "#EB7879" }} onClick={onClickHandlerQuit} className={style.logout} />
      </div>
    </div>
  );
}

export default Header;