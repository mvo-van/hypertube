import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import style from "./MoviePage.module.css"
import {useNavigate, useParams} from "react-router-dom";
import Comments from "../../components/comments/Comments";
import MovieInfo from "../../components/movieInfo/MovieInfo";
import DivSeasons from "../../components/divSeasons/DivSeasons";
import DivEpisodes from "../../components/divEpisodes/DivEpisodes";

function MoviePage() {
  const {id} = useParams();
  const [message, setMessage] = useState("")
  const [movie, setMovie] = useState(
    {"time":108,"dateStart":2022,"dateEnd":null, "date":2022,"episode":1,"nbrEpisodes":9,"note":8.5,"type":"season","season":1,"see":false,"download":false,"like":false,"id":1,"name":"lilo & stitch", "bio":"L’histoire touchante et drôle d’une petite fille hawaïenne solitaire et d’un extra-terrestre fugitif qui l’aide à renouer le lien avec sa famille.","firstName":"george","lastName":"sanderson", "poster":"https://s1.qwant.com/thumbr/474x592/3/a/625cbc4eac94913d6aeb906b515a2d76a426f870a2f21df704c1bbd98b0bc1/OIP.QHawXY5hYWprN8HFhu6SfQHaJQ.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%2Fid%2FOIP.QHawXY5hYWprN8HFhu6SfQHaJQ%3Fpid%3DApi&q=0&b=1&p=0&a=0","banner":"https://leclaireur.fnac.com/wp-content/uploads/2025/05/stitch-disney-1256x826.jpg", "moviesNumber":120, "seriesNumber":40}
  );
  const [comments, setComments] = useState([
    {"userId":1,"userName":"Eithaaaan","imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","commentId":1, "message":"L'agglomération antique de Montaigu-la-Brisette est une agglomération secondaire gallo-romaine des trois premiers siècles de notre ère située sur le territoire de la commune moderne de Montaigu-la-Brisette, dans le département français de la Manche, en région Normandie."},
    {"userId":1,"userName":"Eithaaaan","imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","commentId":2, "message":"Dans la géographie antique, elle est située dans la partie nord-est de la civitas des Unelles (province de Gaule lyonnaise) ; elle n'est toutefois citée dans aucun texte et ne figure sur aucun itinéraire antique. Malgré sa petite taille, estimée à 15 hectares tout au plus pour sa partie densément construite, elle comporte un vaste sanctuaire au nord-ouest et des thermes publics monumentaux partiellement aménagés au-dessus du lit d'un ruisseau canalisé au sud-est ; par opposition, les bâtiments édifiés dans la partie centrale voient se côtoyer des habitations aisées pourvues de portiques et des constructions au plan plus modeste mais dotées de jardins ou de dépendances à vocation peut-être artisanale, le tout selon une organisation assez lâche, sans schéma urbain uniforme. Cette configuration interroge sur la fonction et le statut de l'agglomération, peut-être une ville-étape sur un itinéraire antique et/ou un centre de production céréalière. À proximité plus ou moins grande de l'agglomération, des établissements agricoles ou artisanaux semblent liés au site principal ; ils sont en tout cas actifs du Ier au IIIe siècle apr. J.-C., tout comme l'agglomération elle-même."},
    {"userId":1,"userName":"Eithaaaan","imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","commentId":3, "message":"La rue Paul-Vaillant-Couturier est une voie de communication située à Clamart dans les Hauts-de-Seine[1]."},
    {"userId":1,"userName":"Eithaaaan","imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","commentId":4, "message":"L’abbaye d'Olivet est une ancienne abbaye cistercienne, qui était située sur le territoire de la commune de Saint-Julien-sur-Cher, dans le Loir-et-Cher."},
    {"userId":1,"userName":"Eithaaaan","imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","commentId":5, "message":"Il se situe à environ 6 kilomètres au nord-est de Nowy Tomyśl (siège de la gmina et du powiat) et à 51 kilomètres à l'ouest de Poznań (capitale régionale)."},
  ]);
  const [seasons, setSeasons] = useState([
    {"see":true,"seasonId":1,"seasonNbr":1,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","date":2020},
    {"see":false,"seasonId":2,"seasonNbr":2,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","date":2021},
    {"see":false,"seasonId":3,"seasonNbr":3,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","date":2022},
    {"see":true,"seasonId":4,"seasonNbr":4,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","date":2023},
    {"see":true,"seasonId":5,"seasonNbr":5,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","date":2024},
  ]);

  const [episodes, setEpisodes] = useState([
    {"synopsis":"Mark est promu à la tête d'une équipe d'employés dont la mémoire a été dédoublée, par voie chirurgicale, pour séparer leur vie privée et leur vie professionnelle.","note":8.9,"title":"Le bon côté de l’enfer","see":true,"start":12,"seasonId":1,"episodeNbr":1,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","time":54},
    {"synopsis":"L'équipe forme la nouvelle recrue Helly au raffinement des macrodonnées. Mark prend un jour de congé pour rencontrer un ancien collègue mystérieux.","note":5,"title":"Demi-boucle","see":false,"start":0,"seasonId":2,"episodeNbr":2,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","time":56},
    {"synopsis":"Mark emmène son équipe en excursion, mais Helly continue à se rebeller.","note":5,"title":"A perpétuité","see":false,"start":0,"seasonId":3,"episodeNbr":3,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","time":75},
    {"synopsis":"Mark emmène son équipe en excursion, mais Helly continue à se rebeller.","note":6.7,"title":"Le bon côté de l’enfer","see":true,"start":0,"seasonId":4,"episodeNbr":4,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","time":35},
    {"synopsis":"Mark emmène son équipe en excursion, mais Helly continue à se rebeller.","note":7.8,"title":"Le bon côté de l’enfer","see":true,"start":40,"seasonId":5,"episodeNbr":5,"poster":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg","time":45},
  ]);

  const onMessageSubmit = (e) => {
    // TODO ajouter appel au back
    e.preventDefault();
    if (message.trim()){
      setMessage("")
      setComments(comments.concat({"userId":1,"userName":"Eithan", "imgUser":"https://cinefilms-planet.fr/wp-content/uploads/2010/04/bob-razowski-personnage-monstres-academy-02-1-1536x864.jpg", "commentId":6, "message":message}))
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

          <MovieInfo movie={movie}/>
          {
            (movie.type=="episode" || movie.type=="movie") &&
            <Comments comments={comments} color={movie.id%12} movieIcon={false} message={message} onMessageHeandler={onMessageHeandler} onMessageSubmit={onMessageSubmit}/>
          }
          {
            movie.type=="serie" &&
            <DivSeasons seasons={seasons}/>
          }
          {
            movie.type=="season" &&
            <DivEpisodes episodes={episodes}/>
          }
        </div>
      </div>
    </GenericPage>
  );
}

export default MoviePage;
