import { useRef, useState, useEffect } from "react";
import style from "./ChangeEmail.module.css";
import Input from "../input/Input";
import Form from "../form/Form";
import { api } from "../../common/api";
import useErrorManager from "../../hooks/useErrorManager";
import {
    ERROR_INVALID_MAIL,
    ERROR_UNKNOWN,
    ERROR_ALREADY_USED_MAIL,
} from "../../common/messages";

export default function ChangeEmail() {
    const [newMail, setNewMail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const mailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,20}$/;

    const useError = useErrorManager();

    const onClickChangeMail = async () => {
        if (isOpen == false) {
            setSuccess(false);
        }
        setIsOpen(true);
    };

    const onNewMailHandler = (value) => {
        setNewMail(value);
        const test = mailRegex.test(value);
        if (test == false) useError.addInputError(ERROR_INVALID_MAIL);
        else useError.removeError(ERROR_INVALID_MAIL);
        useError.removeError(ERROR_ALREADY_USED_MAIL);
    };

    const onNewMailValidate = (value) => {
        if (!value) useError.addInputError(ERROR_INVALID_MAIL);
    };

    const closeBox = () => {
        setIsOpen(false);
        setSuccess(true);
        setNewMail("");
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (useError.hasInputErrors())
            return;
        // if (alreadyUsedMail(mail)) {
        //     useError.addInputError(ERROR_ALREADY_USED_MAIL);
        //     return
        // } TODO faire fonctionner ici
        if (newMail) {

            try {
                await api.patch("/users/me", {
                    email: newMail,
                });
                closeBox();
            } catch (e) { useError.addInputError(ERROR_INVALID_MAIL); }
        }
    };

    return (
        <div className={style.mailChangeBox}>

            {isOpen == false && <button className={style.buttonConnexion} onClick={onClickChangeMail}>Changer l'adresse mail</button>}
            {success == true && <p className={style.success}>Votre adresse mail a bien été modifié !</p>}
            {isOpen && <Form
                className={style.changeEmailForm}
                onSubmit={onSubmitHandler}
                label="Valider"
                color="blue"
            >
                {useError.hasThisError(ERROR_UNKNOWN) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_UNKNOWN}
                    </div>
                )}
                <Input
                    label="Nouvelle adresse mail"
                    type="email"
                    value={newMail}
                    onChange={onNewMailHandler}
                    onBlur={onNewMailValidate}
                    color="blue"
                    maxLength={320}
                />
                {useError.hasThisError(ERROR_INVALID_MAIL) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_INVALID_MAIL}
                    </div>
                )}
                {useError.hasThisError(ERROR_ALREADY_USED_MAIL) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_ALREADY_USED_MAIL}
                    </div>
                )}
            </Form>}
        </div>
    )
}