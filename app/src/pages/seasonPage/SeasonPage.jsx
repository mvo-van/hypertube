import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./SeasonPage.module.css"
import { useParams } from "react-router-dom";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import DivEpisodes from "../../components/divEpisodes/DivEpisodes";
import { api } from "../../common/api";
import { CircularProgress } from "@mui/material";

function SeasonPage() {
  const { serie_id, season_number } = useParams();
  const [season, setSeason] = useState({});
  const [info_get, setInfo_get] = useState(false)
  const [episodes, setEpisodes] = useState([]);
  const getSeason = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/serie/${serie_id}/season/${season_number}`);
      console.log(res.data)

      setSeason(res.data.season_infos)
      setEpisodes(res.data.episodes)
      setInfo_get(true)
    } catch (e) {
    }
  }

  useEffect(() => {
    getSeason()
  }, [])

  return (
    <GenericPage>
      <Header />
      <div className={style.banner} >
        <div className={style.movieBox}  >
          {!info_get && <div className={style.chargeDiv}>
            <CircularProgress color="inherit" size="3rem" />
          </div>}
          {info_get && <MovieInfo movie={season} />}

          {
            info_get &&
            <DivEpisodes episodes={episodes} />
          }
        </div>
      </div>
    </GenericPage>
  );
}

export default SeasonPage;
