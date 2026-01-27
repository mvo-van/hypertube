import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import style from "./ProfileUser.module.css"
import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comments from "../../components/comments/Comments";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import axios from "axios";

function ProfileUser() {
  const {id} = useParams();

  const [me, setMe] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([
    {"movieId":1,"commentId":1, "message":"L'agglomération antique de Montaigu-la-Brisette est une agglomération secondaire gallo-romaine des trois premiers siècles de notre ère située sur le territoire de la commune moderne de Montaigu-la-Brisette, dans le département français de la Manche, en région Normandie.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
    {"movieId":1,"commentId":2, "message":"Dans la géographie antique, elle est située dans la partie nord-est de la civitas des Unelles (province de Gaule lyonnaise) ; elle n'est toutefois citée dans aucun texte et ne figure sur aucun itinéraire antique. Malgré sa petite taille, estimée à 15 hectares tout au plus pour sa partie densément construite, elle comporte un vaste sanctuaire au nord-ouest et des thermes publics monumentaux partiellement aménagés au-dessus du lit d'un ruisseau canalisé au sud-est ; par opposition, les bâtiments édifiés dans la partie centrale voient se côtoyer des habitations aisées pourvues de portiques et des constructions au plan plus modeste mais dotées de jardins ou de dépendances à vocation peut-être artisanale, le tout selon une organisation assez lâche, sans schéma urbain uniforme. Cette configuration interroge sur la fonction et le statut de l'agglomération, peut-être une ville-étape sur un itinéraire antique et/ou un centre de production céréalière. À proximité plus ou moins grande de l'agglomération, des établissements agricoles ou artisanaux semblent liés au site principal ; ils sont en tout cas actifs du Ier au IIIe siècle apr. J.-C., tout comme l'agglomération elle-même.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
    {"movieId":1,"commentId":3, "message":"La rue Paul-Vaillant-Couturier est une voie de communication située à Clamart dans les Hauts-de-Seine[1].","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
    {"movieId":1,"commentId":4, "message":"L’abbaye d'Olivet est une ancienne abbaye cistercienne, qui était située sur le territoire de la commune de Saint-Julien-sur-Cher, dans le Loir-et-Cher.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
    {"movieId":1,"commentId":5, "message":"Il se situe à environ 6 kilomètres au nord-est de Nowy Tomyśl (siège de la gmina et du powiat) et à 51 kilomètres à l'ouest de Poznań (capitale régionale).","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
  ]);

  const [movies, setMovies] = useState([{"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch", "date":"2025","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    {"id":1,"name":"lilo & Stitch","date":"2025", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
  ]);

  const getUserProfile = async() =>{
    const config = { withCredentials: true };
    try {
      const res = await axios.get(`http://localhost:3000/users/`+id, config);
      console.log(res.data)
      setUser({id : res.data.id,
          pseudo:res.data.username,
          urlImg:res.data.profile_picture_url,
          firstName:res.data.first_name,
          lastName:res.data.last_name})
      setMe(res.data.me)
    } catch (e) {
    }
  }

  useEffect(()=>{
    getUserProfile()
  },[id])

  return (
    <GenericPage>
      <Header />
      <div className={style.user}>
        <UserInfo user={user} me={me}/>
        {/* <div className={`${style.line} ${style[`line_color_${user.id%12}`]}`}/> */}
        {movies.length && <div className={style.watchlist}>
          <HorizontalScrollMovies movies={movies} label="watchlist"/>
        </div>}
        <Comments comments={comments} color={user.id%12} movieIcon={true} commentForm={false}/>
      </div>
    </GenericPage>
  );
}

export default ProfileUser;
