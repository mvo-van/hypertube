import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import style from "./Settings.module.css"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { api } from "../../common/api";
import Notification from "../../components/notification/Notifiacation";

function Settings() {
  const [pseudo, setPseudo] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mail, setMail] = useState("")
  const [language, setLanguage] = useState("fr")
  const [showName, setShowName] = useState(true)
  const [showWatch, setShowWatch] = useState(true)
  const [showWatchList, setShowWatchList] = useState(true)
  const [photo, setPhoto] = useState("")
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("")
  const [notifColor, setNatifColor] = useState("red")
  const [updateImage, setUpdateImage] = useState(null)

  const getUserProfile = async () => {
    try {
      const res = await api.get(`http://localhost:3000/users/me`);
      setPseudo(res.data.username)
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setMail(res.data.email)
      setLanguage(res.data.language)
      setPhoto(res.data.profile_picture_url)
      setShowName(res.data.show_name)
      setShowWatch(res.data.show_watch)
      setShowWatchList(res.data.show_watchlist)
    } catch (e) {
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  // const [movies, setMovies] = useState([]);

  const onPseudoHandler = (e) => {
    setPseudo(e.target.value)
  }

  const onFirstNameHandler = (e) => {
    setFirstName(e.target.value)
  }

  const onLastNameHandler = (e) => {
    setLastName(e.target.value)
  }

  const onMailHandler = (e) => {
    setMail(e.target.value)
  }

  const onImageHandler = (e) => {
    setUpdateImage(e.target.files[0])
    setPhoto(URL.createObjectURL(e.target.files[0]))
  }

  const onClickChangePwd = (e) => {
    // todo
  }

  const onClickChangeMail = (e) => {
    // todo
  }

  const onLanguageHandler = (e) => {
    setLanguage(e.target.value)
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

  const onClickSaveProfil = async (e) => {
    e.preventDefault();
    try {
      if (updateImage) {
        const data = new FormData();
        data.append("image", updateImage);
        await api.post("/users/me/upload", data);
      }

      await api.patch("/users/me", {
        username: pseudo,
        first_name: firstName,
        last_name: lastName,
        language: language,
        show_name: showName,
        show_watch: showWatch,
        show_watchlist: showWatchList
      });
      setText("Mise a jour de votre pofile validé")
      setNatifColor("green")
      setVisible(true);
      setTimeout(() => { setVisible(false); }, 5000);
    } catch (e) {
      setText("Une erreur est survenue")
      setNatifColor("red")
      setVisible(true);
      setTimeout(() => { setVisible(false); }, 5000);
    }
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
                  <input className={style.inputText} type="text" id="pseudo" value={pseudo} onChange={onPseudoHandler} />
                  <div className={style.subSubTitle}>Prénom</div>
                  <input className={style.inputText} type="text" id="firstName" value={firstName} onChange={onFirstNameHandler} />
                  <div className={style.subSubTitle}>Nom</div>
                  <input className={style.inputText} type="text" id="lastName" value={lastName} onChange={onLastNameHandler} />
                </div>
                <div >
                  <label htmlFor="photo" className={style.boxPhoto}>
                    <BorderColorIcon className={style.icone} />
                    {photo && <img className={style.photo} src={photo} />}
                    {(!photo) && <img className={style.photo} src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png" />}
                  </label>
                  <input className={style.displayFalse} type="file" id="photo" onChange={onImageHandler} accept="image/png, image/jpeg" />
                </div>
              </div>

            </div>
            <div className={style.line}></div>
            <div className={style.subTitle}>Authentification</div>
            <div className={style.divAuthentication}>
              <button className={style.buttonConnexion} onClick={onClickChangePwd}>Réinitialiser le mot de passe</button>
              <button className={style.buttonConnexion} onClick={onClickChangeMail}>Mise a jour de mon mail </button>
            </div>

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
          <Notification visible={visible} color={notifColor} text={text} />
        </div>
      </div>
    </GenericPage>
  );
}

export default Settings;