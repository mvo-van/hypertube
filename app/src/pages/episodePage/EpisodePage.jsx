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

  const [comments, setComments] = useState([
    { "userId": 1, "userName": "Eithaaaan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 1, "message": "L'agglomération antique de Montaigu-la-Brisette est une agglomération secondaire gallo-romaine des trois premiers siècles de notre ère située sur le territoire de la commune moderne de Montaigu-la-Brisette, dans le département français de la Manche, en région Normandie." },
    { "userId": 1, "userName": "Eithaaaan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 2, "message": "Dans la géographie antique, elle est située dans la partie nord-est de la civitas des Unelles (province de Gaule lyonnaise) ; elle n'est toutefois citée dans aucun texte et ne figure sur aucun itinéraire antique. Malgré sa petite taille, estimée à 15 hectares tout au plus pour sa partie densément construite, elle comporte un vaste sanctuaire au nord-ouest et des thermes publics monumentaux partiellement aménagés au-dessus du lit d'un ruisseau canalisé au sud-est ; par opposition, les bâtiments édifiés dans la partie centrale voient se côtoyer des habitations aisées pourvues de portiques et des constructions au plan plus modeste mais dotées de jardins ou de dépendances à vocation peut-être artisanale, le tout selon une organisation assez lâche, sans schéma urbain uniforme. Cette configuration interroge sur la fonction et le statut de l'agglomération, peut-être une ville-étape sur un itinéraire antique et/ou un centre de production céréalière. À proximité plus ou moins grande de l'agglomération, des établissements agricoles ou artisanaux semblent liés au site principal ; ils sont en tout cas actifs du Ier au IIIe siècle apr. J.-C., tout comme l'agglomération elle-même." },
    { "userId": 1, "userName": "Eithaaaan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 3, "message": "La rue Paul-Vaillant-Couturier est une voie de communication située à Clamart dans les Hauts-de-Seine[1]." },
    { "userId": 1, "userName": "Eithaaaan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 4, "message": "L’abbaye d'Olivet est une ancienne abbaye cistercienne, qui était située sur le territoire de la commune de Saint-Julien-sur-Cher, dans le Loir-et-Cher." },
    { "userId": 1, "userName": "Eithaaaan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 5, "message": "Il se situe à environ 6 kilomètres au nord-est de Nowy Tomyśl (siège de la gmina et du powiat) et à 51 kilomètres à l'ouest de Poznań (capitale régionale)." },
  ]);

  const getEpisode = async () => {
    try {
      const res = await api.get(`http://localhost:3000/movies/serie/${serie_id}/season/${season_number}/episode/${episode_number}`);
      setEpisode(res.data.episode_infos)
      setInfo_get(true)
    } catch (e) {
    }
  }

  useEffect(() => {
    getEpisode()
  }, [])

  const onMessageSubmit = (e) => {
    // TODO ajouter appel au back
    e.preventDefault();
    if (message.trim()) {
      setMessage("")
      setComments(comments.concat({ "userId": 1, "userName": "Eithan", "imgUser": "https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId": 6, "message": message }))
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
