import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import style from "./ProfileUser.module.css"
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comments from "../../components/comments/Comments";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import axios from "axios";
import { api } from "../../common/api";

function ProfileUser() {
  const { id } = useParams();

  const [me, setMe] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  const [movies, setMovies] = useState([{ "id": 1, "name": "lilo & Stitch", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  { "id": 1, "name": "lilo & Stitch", "date": "2025", "urlImg": "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see": true },
  ]);

  const getUserProfile = async () => {
    const config = { withCredentials: true };
    try {
      const res = await axios.get(`http://localhost:3000/users/` + id, config);
      setUser({
        id: res.data.id,
        pseudo: res.data.username,
        urlImg: res.data.profile_picture_url,
        firstName: res.data.first_name,
        lastName: res.data.last_name
      })
      setMe(res.data.me)
    } catch (e) {
    }
  }

  const getComments = async () => {
    try {
      const res = await api.get(`comments/user/${id}`)
      console.log(res.data)
      setComments(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserProfile()
    getComments()
  }, [id])

  return (
    <GenericPage>
      <Header />
      <div className={style.user}>
        <UserInfo user={user} me={me} />
        {/* <div className={`${style.line} ${style[`line_color_${user.id%12}`]}`}/> */}
        {movies.length && <div className={style.watchlist}>
          <HorizontalScrollMovies movies={movies} label="watchlist" />
        </div>}
        <Comments comments={comments} color={user.id % 12} movieIcon={true} commentForm={false} />
      </div>
    </GenericPage>
  );
}

export default ProfileUser;
