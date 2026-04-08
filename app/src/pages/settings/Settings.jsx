import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import style from "./Settings.module.css"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { api } from "../../common/api";
import Notification from "../../components/notification/Notifiacation";
import ChangePassword from "../../components/settings/ChangePassword";
import { checkAuthConnected } from "../../common/checkAuth";
import ChangeEmail from "../../components/settings/ChangeEmail";
import useErrorManager from "../../hooks/useErrorManager";
import { ERROR_INVALID_FIRST_NAME, ERROR_INVALID_LAST_NAME, ERROR_INVALID_NICK, ERROR_NICKNAME } from "../../common/messages";
import { alreadyUsedUsername } from "../../components/SignupCheck/SignupUserCheck";
import { useNavigate } from "react-router";

function Settings() {
  const [strategy, setStrategy] = useState("");
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
  const pseudoRegex = /^(?=.{3,20}$)[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
  const nameRegex = /^(?=.{2,20}$)[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  const useError = useErrorManager();
  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      const resAuthConnected = await checkAuthConnected();
      if (resAuthConnected) {
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
        setStrategy(res.data.auth_strategy);
      }
    } catch (e) {
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const onPseudoHandler = (e) => {
    setPseudo(e.target.value)
    const test = pseudoRegex.test(e.target.value);
    if (test == false) useError.addInputError(ERROR_INVALID_NICK);
    else useError.removeError(ERROR_INVALID_NICK);
    useError.removeError(ERROR_NICKNAME);
  }

  const onFirstNameHandler = (e) => {
    setFirstName(e.target.value)
    const test = nameRegex.test(e.target.value);
    if (test == false) useError.addInputError(ERROR_INVALID_FIRST_NAME);
    else useError.removeError(ERROR_INVALID_FIRST_NAME);
  }

  const onLastNameHandler = (e) => {
    setLastName(e.target.value)
    const test = nameRegex.test(e.target.value);
    if (test == false) useError.addInputError(ERROR_INVALID_LAST_NAME);
    else useError.removeError(ERROR_INVALID_LAST_NAME);
  }

  const onMailHandler = (e) => {
    setMail(e.target.value)
  }

  const onImageHandler = (e) => {
    setUpdateImage(e.target.files[0])
    setPhoto(URL.createObjectURL(e.target.files[0]))
  }

  const onLanguageHandler = (e) => {
    setLanguage(e.target.value)
  }

  const onClickShowWatchListYes = () => {
    setShowWatchList(true)
  }

  const onClickShowWatchListNo = () => {
    setShowWatchList(false)
  }

  const onClickDeleteProfile = async () => {
    try {
      const resAuthConnected = await checkAuthConnected();
      if (resAuthConnected) {
        await api.delete("/users/me");
        navigate(`/`);
      }
    } catch (e) {
    }
    //TODO
  }

  const onClickSaveProfil = async (e) => {
    e.preventDefault();
    if (useError.hasInputErrors())
      return;
    // if (alreadyUsedUsername(pseudo)) {
    //     useError.addInputError(ERROR_NICKNAME);
    //     return
    // } TODO faire fonctionner ici
    try {
      const resAuthConnected = await checkAuthConnected();
      if (resAuthConnected) {
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
        setText("Mise a jour de votre profile validé")
        setNatifColor("green")
        setVisible(true);
        setTimeout(() => { setVisible(false); }, 5000);
      }
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
                  <input className={style.inputText} type="text" id="pseudo" value={pseudo} onChange={onPseudoHandler} maxLength="20" />
                  {useError.hasThisError(ERROR_INVALID_NICK) && (<div className={style["invalid-alert"]}> {ERROR_INVALID_NICK} </div>)}
                  {useError.hasThisError(ERROR_NICKNAME) && (<div className={style["invalid-alert"]}> {ERROR_NICKNAME} </div>)}
                  <div className={style.subSubTitle}>Prénom</div>
                  <input className={style.inputText} type="text" id="firstName" value={firstName} onChange={onFirstNameHandler} maxLength="20" />
                  {useError.hasThisError(ERROR_INVALID_FIRST_NAME) && (<div className={style["invalid-alert"]}> {ERROR_INVALID_FIRST_NAME} </div>)}
                  <div className={style.subSubTitle}>Nom</div>
                  <input className={style.inputText} type="text" id="lastName" value={lastName} onChange={onLastNameHandler} maxLength="20" />
                  {useError.hasThisError(ERROR_INVALID_LAST_NAME) && (<div className={style["invalid-alert"]}> {ERROR_INVALID_LAST_NAME} </div>)}
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
            {strategy && strategy == "local" && <div className={style.subTitle}>Authentification</div>}
            {strategy && strategy == "local" && <div className={style.divAuthentication}>
              <ChangePassword />
              <ChangeEmail />
            </div>}

            {strategy && strategy == "local" && <div className={style.line}></div>}

            <div className={style.subTitle}>Langue préférée</div>

            <select className={style.language} name="language" id="language-select" onChange={onLanguageHandler} value={language}>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portugese</option>
              <option value="nl">Dutch</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
              <option value="tr">Turkish</option>
              <option value="pl">Polish</option>
              <option value="sv">Swedish</option>
              <option value="no">Norwegian</option>
              <option value="da">Danish</option>
              <option value="fi">Finnish</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="th">Thai</option>
              <option value="id">Indonesian</option>
              <option value="cs">Czech</option>
              <option value="hu">Hungarian</option>
              <option value="ro">Romanian</option>
              <option value="sk">Slovak</option>
              <option value="uk">Ukrainian</option>
              <option value="vi">Vietnamese</option>
            </select>

            <div className={style.line}></div>

            <div className={style.subTitle}>Confidentialité du profil</div>
            <div className={style.boxDisplay}>
              <div className={style.display}>Afficher films/séries vus </div>
              <div><button className={`${style[`yes_${showWatchList}`]} ${style.yes}`} onClick={onClickShowWatchListYes}>oui</button>
                <button className={`${style[`no_${showWatchList}`]} ${style.no}`} onClick={onClickShowWatchListNo}>non</button>
              </div>
            </div>

            <div className={style.line}></div>

            <div className={style.subTitle}>Suppression</div>
            <button onClick={onClickDeleteProfile} className={style.deleteButton}>Supprimer mon profil</button>
          </div>

          <button className={style.saveButton} onClick={onClickSaveProfil}>Sauvegarder</button>
          <Notification visible={visible} color={notifColor} text={text} />
        </div>
      </div>
    </GenericPage>
  );
}

export default Settings;