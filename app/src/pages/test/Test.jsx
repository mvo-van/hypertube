import style from "./Test.module.css"
// import HomeBackground from "../../components/home/HomeBackground";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText"
import BubbleBackground from "../../components/background/BubbleBackground";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Header from "../../components/header/Header";


function Test() {
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
        <GenericPage>
                <Header />
                <div className={style.bigDiv}></div>
        </GenericPage>
    );
}

export default Test;
