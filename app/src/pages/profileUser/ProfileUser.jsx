import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import style from "./ProfileUser.module.css"
import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comments from "../../components/comments/Comments";

function ProfileUser() {
    const {id} = useParams();

    const [user, setUsers] = useState(
        {"id":1,"pseudo":"augustes", "firstName":"george","lastName":"sanderson","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "moviesNumber":120, "seriesNumber":40}
    );
    const [comments, setComments] = useState([
        {"movieId":1, "message":"L'agglomération antique de Montaigu-la-Brisette est une agglomération secondaire gallo-romaine des trois premiers siècles de notre ère située sur le territoire de la commune moderne de Montaigu-la-Brisette, dans le département français de la Manche, en région Normandie.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
        {"movieId":2, "message":"Dans la géographie antique, elle est située dans la partie nord-est de la civitas des Unelles (province de Gaule lyonnaise) ; elle n'est toutefois citée dans aucun texte et ne figure sur aucun itinéraire antique. Malgré sa petite taille, estimée à 15 hectares tout au plus pour sa partie densément construite, elle comporte un vaste sanctuaire au nord-ouest et des thermes publics monumentaux partiellement aménagés au-dessus du lit d'un ruisseau canalisé au sud-est ; par opposition, les bâtiments édifiés dans la partie centrale voient se côtoyer des habitations aisées pourvues de portiques et des constructions au plan plus modeste mais dotées de jardins ou de dépendances à vocation peut-être artisanale, le tout selon une organisation assez lâche, sans schéma urbain uniforme. Cette configuration interroge sur la fonction et le statut de l'agglomération, peut-être une ville-étape sur un itinéraire antique et/ou un centre de production céréalière. À proximité plus ou moins grande de l'agglomération, des établissements agricoles ou artisanaux semblent liés au site principal ; ils sont en tout cas actifs du Ier au IIIe siècle apr. J.-C., tout comme l'agglomération elle-même.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
        {"movieId":3, "message":"La rue Paul-Vaillant-Couturier est une voie de communication située à Clamart dans les Hauts-de-Seine[1].","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
        {"movieId":4, "message":"L’abbaye d'Olivet est une ancienne abbaye cistercienne, qui était située sur le territoire de la commune de Saint-Julien-sur-Cher, dans le Loir-et-Cher.","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
        {"movieId":5, "message":"Il se situe à environ 6 kilomètres au nord-est de Nowy Tomyśl (siège de la gmina et du powiat) et à 51 kilomètres à l'ouest de Poznań (capitale régionale).","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"},
    ]);

    return (
        <GenericPage>
                <Header />
                <div className={style.user}>
                    <UserInfo user={user}/>
                    <div className={`${style.line} ${style[`line_color_${user.id%12}`]}`}/>
                    <Comments comments={comments} color={user.id%12}/>
                </div>
        </GenericPage>
    );
}

export default ProfileUser;
