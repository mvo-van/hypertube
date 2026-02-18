import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./EpisodePage.module.css"
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import DivSeasons from "../../components/divSeasons/DivSeasons";
import DivEpisodes from "../../components/divEpisodes/DivEpisodes";
import { api } from "../../common/api";
import { CircularProgress } from "@mui/material";

function EpisodePage() {
  const { serie_id, season_number, episode_number } = useParams();
  const [message, setMessage] = useState("")
  const [episode, setEpisode] = useState({})
  const [info_get, setInfo_get] = useState(false)

  const [comments, setComments] = useState([]);

  const getEpisode = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/serie/${serie_id}/season/${season_number}/episode/${episode_number}`);
      setEpisode(res.data.episode_infos)

      setInfo_get(true)
    } catch (e) {
    }
  }

  const getComments = async () => {
    try {
      const res = await api.get(`http://localhost:3000/comments/movie/episode/${serie_id}_${season_number}_${episode_number}`);
      setComments(res.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    getEpisode()
    getComments()
  }, [])

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post(`http://localhost:3000/comments`, { movie_id: `${serie_id}_${season_number}_${episode_number}`, movieType: "episode", content: message });

    if (message.trim()) {
      setMessage("")
      setComments(comments.concat({ "userId": res.data.user.id, "userName": res.data.user.username, "imgUser": res.data.user.profile_picture_url, "id": res.data.id, "message": res.data.content }))
    }
  }

  const onMessageHeandler = (e) => {
    setMessage(e.target.value)
  }

  return (
    <GenericPage>
      <Header />
      <div className={style.banner} >
        <div className={style.movieBox}  >
          {!info_get && <div className={style.chargeDiv}>
            <CircularProgress color="inherit" size="3rem" />
          </div>}
          {info_get && <MovieInfo movie={episode} />}
          <Comments comments={comments} color={episode.id % 12} movieIcon={false} message={message} onMessageHeandler={onMessageHeandler} onMessageSubmit={onMessageSubmit} />
        </div>
      </div>
    </GenericPage>
  );
}

export default EpisodePage;
