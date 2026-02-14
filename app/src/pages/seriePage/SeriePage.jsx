import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./SeriePage.module.css"
import { useNavigate, useParams } from "react-router-dom";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import DivSeasons from "../../components/divSeasons/DivSeasons";
import { api } from "../../common/api";
import { CircularProgress } from "@mui/material";

function SeriePage() {
  const { id } = useParams();
  const [info_get, setInfo_get] = useState(false)
  const [serie, setSerie] = useState({});
  const [seasons, setSeasons] = useState([])
  const getSerie = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/serie/${id}`);
      setSerie(res.data.serie_infos)
      setSeasons(res.data.seasons)
      setInfo_get(true)
    } catch (e) {
    }
  }

  useEffect(() => {
    getSerie()
  }, [])

  return (
    <GenericPage>
      <Header />
      <div className={style.banner} >
        <div className={style.movieBox}  >
          {!info_get && <div className={style.chargeDiv}>
            <CircularProgress color="inherit" size="3rem" />
          </div>}
          {info_get && <MovieInfo movie={serie} />}
          {
            info_get &&
            <DivSeasons seasons={seasons} />
          }
        </div>
      </div>
    </GenericPage>
  );
}

export default SeriePage;
