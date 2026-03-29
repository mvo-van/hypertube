import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./MoviePage.module.css"
import { useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import { api } from "../../common/api";
import { CircularProgress } from "@mui/material";
import VideoPlayer from "./VideoPlayer";

function MoviePage() {
  const { id } = useParams();
  const [message, setMessage] = useState("")
  const [movie, setMovie] = useState({})
  const [info_get, setInfo_get] = useState(false)
  const [comments, setComments] = useState([]);
  const [clickStart, setClickStart] = useState(false)
  const [download, setDownload] = useState({})
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const getMovie = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/${id}`);
      setMovie(res.data)
      setDownload(res.data.download)
      setInfo_get(true)
    } catch (e) {
    }
  }

  const getComments = async () => {
    try {
      const res = await api.get(`http://localhost:3000/comments/movie/movie/${id}`);
      setComments(res.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    getMovie()
    getComments()
  }, [])

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      const res = await api.post(`http://localhost:3000/comments`, { movie_id: `${id}`, movieType: "movie", content: message });
      if (message.trim()) {
        setMessage("")
        setComments(comments.concat({
          "id": res.data.user.id,
          "userName": res.data.user.username,
          "imgUser": res.data.user.profile_picture_url,
          "commentId": res.data.id,
          "message": res.data.content
        }))
      }
    }
  }

  const onMessageHeandler = (e) => {
    setMessage(e.target.value)
  }

  const onClickStart = () => {
    setClickStart(true)
    api.post(`/media-file/watched/${movie.imdb_id}`)
      .catch(() => { });
  }

  const onClickDownload = async () => {
    try {
      console.log("here")
      await api.get(`/download/${movie.imdb_id}`)
      let startValide = false
      while (!startValide) {
        await sleep(5000)
        const res = await api.get(`/media-file/status/${movie.imdb_id}`)
        console.log("here")
        if (res.data.exists && res.data.status != "pending" && res.data.status != "started") {
          setDownload(res.data)
          startValide = true
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <GenericPage>
      <Header />
      <div className={style.banner} >
        <div className={style.movieBox}  >
          {!info_get && <div className={style.chargeDiv}>
            <CircularProgress color="inherit" size="3rem" />
          </div>}
          {info_get && <MovieInfo movie={movie} download={download} onClickStart={onClickStart} onClickDownload={onClickDownload} />}
          {clickStart && <VideoPlayer imdbID={movie.imdb_id} subtitlesAuto={movie.subtitlesAuto} />}
          {download.exists && download.status == "error" && <div className={style.errorMovieDownload}>Ce film n'est pas disponible dans la librerie</div>}
          <Comments comments={comments}
            color={movie.id % 12}
            movieIcon={false}
            message={message}
            onMessageHeandler={onMessageHeandler}
            onMessageSubmit={onMessageSubmit} />

        </div>
      </div>
    </GenericPage>
  );
}

export default MoviePage;
