import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./MoviePage.module.css"
import { useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import { api } from "../../common/api";
import { CircularProgress } from "@mui/material";

function MoviePage() {
  const { id } = useParams();
  const [message, setMessage] = useState("")
  const [movie, setMovie] = useState({})
  const [info_get, setInfo_get] = useState(false)
  const [comments, setComments] = useState([]);

  const getMovie = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/${id}`);
      setMovie(res.data)
      setInfo_get(true)
    } catch (e) {
    }
  }

  const getComments = async () => {
    try {
      const res = await api.get(`http://localhost:3000/comments/movie/movie/${id}`);
      console.log(res.data)
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
          {info_get && <MovieInfo movie={movie} />}
          {
            (movie.type == "episode" || movie.type == "movie") &&
            <Comments comments={comments}
              color={movie.id % 12}
              movieIcon={false}
              message={message}
              onMessageHeandler={onMessageHeandler}
              onMessageSubmit={onMessageSubmit} />
          }
        </div>
      </div>
    </GenericPage>
  );
}

export default MoviePage;
