import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import style from "./Settings.module.css"
import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comments from "../../components/comments/Comments";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function Settings() {
  // const {id} = useParams();
  const me = true;
  const [user, setUsers] = useState(
    {"showName":true, "mail":"george@gmail.com","showWatch":true,"showWatchList":true,"language":"fr","id":1,"pseudo":"augustes", "firstName":"george","lastName":"sanderson","photo":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "moviesNumber":120, "seriesNumber":40}
  );

  const [pseudo, setPseudo] = useState(user.pseudo)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [mail, setMail] = useState(user.mail)
  const [language, setLanguage] = useState(user.language)
  const [showName, setShowName] = useState(user.showName)
  const [showWatch, setShowWatch] = useState(user.showWatch)
  const [showWatchList, setShowWatchList] = useState(user.showWatchList)
  const [photo, setPhoto] = useState(user.photo)
  // const [movies, setMovies] = useState([]);

  const onPseudoHandler = (e) => {
    // console.log(e.target.value)
    setPseudo(e.target.value)
  }

  const onFirstNameHandler = (e) => {
    // console.log(e.target.value)
    setFirstName(e.target.value)
  }

  const onLastNameHandler = (e) => {
    // console.log(e.target.value)
    setLastName(e.target.value)
  }

  const onMailHandler = (e) => {
    // console.log(e.target.value)
    setMail(e.target.value)
  }

  const onImageHandler = (e) => {
    console.log(e.target.files)
    setPhoto(URL.createObjectURL(e.target.files[0]))
  }

  const onClickChangePwd = (e) => {
    console.log(e.target.files)
    setPhoto(URL.createObjectURL(e.target.files[0]))
  }

  const onLanguageHandler = (e) => {
    console.log(e.value)
    setLanguage(e.value)
  }

  const onClickShowNameYes = () => {
    setShowName(true)
  }

  const onClickShowNameNo = () => {
    setShowName(false)
  }

  const onClickShowWatchYes = () => {
    setShowWatch(true)
  }

  const onClickShowWatchNo = () => {
    setShowWatch(false)
  }

  const onClickShowWatchListYes = () => {
    setShowWatchList(true)
  }

  const onClickShowWatchListNo = () => {
    setShowWatchList(false)
  }

  const onClickDeletProfil = () => {
    //TODO
  }

  const onClickSaveProfil = () => {
    //TODO
  }

  return (
    <GenericPage>
      <Header />
      <div className={style.allBox}>

        <div className={style.settings}>
          <div className={style.title}>Paramètres</div>
          <div className={style.parameters}>
            <div className={style.infosProfil}>
              <div className={style.subTitle}>Informations du profil</div>

              <div className={style.nameInfo}>
                <div className={style.subNameInfo}>
                  <div className={style.subSubTitle}>Pseudo</div>
                  <input className={style.inputText} type="text" id="pseudo" value={pseudo} onChange={onPseudoHandler}/>
                  <div className={style.subSubTitle}>Prénom</div>
                  <input className={style.inputText} type="text" id="firstName" value={firstName} onChange={onFirstNameHandler}/>
                  <div className={style.subSubTitle}>Nom</div>
                  <input className={style.inputText} type="text" id="lastName" value={lastName} onChange={onLastNameHandler}/>
                  <div className={style.subSubTitle}>Mail</div>
                  <input className={style.inputText} type="text" id="mail" value={mail} onChange={onMailHandler}/>
                </div>
                <div >
                  <label htmlFor="photo" className={style.boxPhoto}>
                    <BorderColorIcon className={style.icone}/>
                    <img className={style.photo} src={photo}/>
                  </label>
                  <input className={style.displayFalse} type="file" id="photo" onChange={onImageHandler} accept="image/png, image/jpeg"/>
                </div>
              </div>

            </div>
            <div className={style.line}></div>
            <div className={style.subTitle}>Authentification</div>
              <button className={style.buttonConnexion} onClick={onClickChangePwd}>Réinitialiser le mot de passe</button>
            <div className={style.line}></div>
            
            <div className={style.subTitle}>Langue préférée</div>

              <select className={style.language} name="language" id="language-select" onChange={onLanguageHandler} value={language}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>

            <div className={style.line}></div>
            
            <div className={style.subTitle}>Confidentialité du profil</div>
              
              <div className={style.boxDisplay}> 
                <div className={style.display}>Afficher prénom/nom </div>
                <div>
                  <button className={`${style[`yes_${showName}`]} ${style.yes}`} onClick={onClickShowNameYes}>oui</button>
                  <button className={`${style[`no_${showName}`]} ${style.no}`} onClick={onClickShowNameNo}>non</button>
                </div>
              </div>
              <div className={style.boxDisplay}>
                <div className={style.display}>Afficher films/séries vus </div>
                <div>
                  <button className={`${style[`yes_${showWatch}`]} ${style.yes}`} onClick={onClickShowWatchYes}>oui</button>
                  <button className={`${style[`no_${showWatch}`]} ${style.no}`} onClick={onClickShowWatchNo}>non</button>
                </div>
              </div>
              <div className={style.boxDisplay}>
                <div className={style.display}>Afficher favoris </div>
                <div><button className={`${style[`yes_${showWatchList}`]} ${style.yes}`} onClick={onClickShowWatchListYes}>oui</button>
                <button className={`${style[`no_${showWatchList}`]} ${style.no}`} onClick={onClickShowWatchListNo}>non</button>
              </div>
            </div>

            <div className={style.line}></div>
            
            <div className={style.subTitle}>Suppression</div>
              <button onClick={onClickDeletProfil} className={style.deletButton}>Supprimer mon profil</button>
          </div>

          <button className={style.saveButton} onClick={onClickSaveProfil}>Sauvegarder</button>
            
        </div>
      </div>
    </GenericPage>
  );
}

export default Settings;