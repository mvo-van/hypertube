import style from "./Signup.module.css"
// import HomeBackground from "../../components/home/HomeBackground";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText"
import BubbleBackground from "../../components/background/BubbleBackground";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onMailHandler = (value) => {
    setEmail(value);
  }
    
  const onMailValidate = (value) => {
  }

  const onPasswordHandler = (value) => {
    setPassword(value);
  }

  const onPassWordValidate = (value) => {
  }

  const onConfPasswordHandler = (value) => {
    setConfPassword(value);
  }

  const onConfPassWordValidate = (value) => {
  }

  const onPseudoHandler = (value) => {
    setPseudo(value);
  }

  const onPseudoValidate = (value) => {
  }

  const onFirstNameHandler = (value) => {
    setFirstName(value);
  }

  const onFirstNameValidate = (value) => {
  }

  const onLastNameHandler = (value) => {
    setLastName(value);
  }

  const onLastNameValidate = (value) => {
  }

  const onSubmitHandler = async (e) => {
  }



  return (
    <GenericPage className={style.home}>
      <BubbleBackground>
        <MulticoText className={style["titre"]} text="Inscription"/>
        <div className={style["button-box"]}>

          <Form className="login-form" onSubmit={onSubmitHandler} label="valider" direction="row" color="yellow">

            <Input
              label="pseudo"
              type="string"
              value={pseudo}
              onChange={onPseudoHandler}
              onBlur={onPseudoValidate}
              color="yellow"
            />

            <Input
              label="prenom"
              type="string"
              value={firstName}
              onChange={onFirstNameHandler}
              onBlur={onFirstNameValidate}
              color="yellow"
            />

            <Input
              label="nom"
              type="string"
              value={lastName}
              onChange={onLastNameHandler}
              onBlur={onLastNameValidate}
              color="yellow"
            />
            <Input
              label="mail"
              type="email"
              value={email}
              onChange={onMailHandler}
              onBlur={onMailValidate}
              color="yellow"
            />
            <Input
              label="mot de passe"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              onBlur={onPassWordValidate}
              color="yellow"
            />
            <Input
              label="confirmation"
              type="password"
              value={confPassword}
              onChange={onConfPasswordHandler}
              onBlur={onConfPassWordValidate}
              color="yellow"
            />
          </Form>
          <hr className={style.line}/>
          <p className={style.titreOmni}>Omniauth</p>
        </div>
      </BubbleBackground>
    </GenericPage>
  );
}

export default Signup;
