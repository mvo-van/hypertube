import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import MovieIcon from "../../components/movieIcon/MovieIcon";
// import MovieIcon from "../../components/movieIcon/MovieIcon";
import style from "./Error404.module.css"
import IconMovie from "../../components/iconMovie/IconMovie";
import MulticoText from "../../components/Text/MulticoText";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { api } from "../../common/api";

function Error404() {
  const navigate = useNavigate();
  const onClickHandler = async () => {
    try {
      await api.get("/auth/connected");
      navigate("/feed");
    } catch (e) {
      navigate("/");
    }
  };
  return (
    <GenericPage>
      <div className={style.error404Div}>
        <MulticoText className={style.titre} text="Error 404" />
        <div className={style.subDivE404}>
          <div className={style.line1}>This Paga Not Found</div>
          <div className={style.line2}>the link might be corrupted</div>
          <div className={style.line3}>or the page may have been removed</div>
        </div>
        <Button color="gery" onClick={onClickHandler}>Go back home</Button>
      </div>
    </GenericPage>
  );
}

export default Error404;
