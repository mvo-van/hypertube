import { useRef, useState, useEffect } from "react";
import style from "./ChangePassword.module.css";
import Input from "../input/Input";
import SignupPasswordCheck from "../SignupCheck/SignupPasswordCheck";
import Form from "../form/Form";
import { api } from "../../common/api";

export default function ChangePassword() {
    const [mail, setMail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const numRegex = /^[0-9]*$/;
    const [otpCode, setOtpCode] = useState("");
    const passwordIsCorrect = useRef();
    const [validOtp, setValidOtp] = useState(true);
    const [success, setSuccess] = useState(false);

    const getUserProfile = async () => {
        try {
            const res = await api.get(`/users/me`);
            setMail(res.data.email);
        } catch (e) {
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const onClickChangePwd = async () => {
        if (isOpen == false) {
            try {
                await api.post("/auth/forgot-password", {
                    email: mail
                });
            }
            catch (error) { console.log(error) }
        }

        setIsOpen(true);
    };

    const onNewPasswordHandler = (value) => {
        setNewPassword(value);
    }

    const onNewPassWordValidate = (value) => { }

    const onCodeHandler = (value) => {
        let test = numRegex.test(value);
        if (test) {
            setOtpCode(value);
            setValidOtp(true);
        }
    };

    const onCodeValidate = (value) => { };

    const onPasswordCheckHandler = (value) => {
        passwordIsCorrect.current = value;
    };

    const closeBox = () => {
        setIsOpen(false);
        setSuccess(true);
        setOtpCode("");
        setNewPassword("");
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (passwordIsCorrect.current) {

            try {
                await api.post("/auth/reset-password", {
                    email: mail,
                    otp_code: otpCode,
                    new_password: newPassword,
                });
                closeBox();
            } catch (e) {
                if (e.response.data.status == 404) setValidOtp(false);
                console.log(e)
            }
        }
    };

    return (
        <div className={style.passwordChangeBox}>

            {isOpen == false && <button className={style.buttonConnexion} onClick={onClickChangePwd}>Réinitialiser le mot de passe</button>}
            {success == true && <p>Votre mot de passe a bien ete modifie !</p>}
            {isOpen && <Form
                className="reset-password-form"
                onSubmit={onSubmitHandler}
                label="Reinitialiser"
                color="blue"
            >
                <Input
                    label="code otp reçu par mail"
                    type="string"
                    mode="numeric"
                    value={otpCode}
                    onChange={onCodeHandler}
                    onBlur={onCodeValidate}
                    color="yellow"
                    maxLength={6}
                />
                <Input
                    label="nouveau mot de passe"
                    type="password"
                    value={newPassword}
                    onChange={onNewPasswordHandler}
                    onBlur={onNewPassWordValidate}
                    color="yellow"
                    maxLength={64}
                />
            </Form>}
            {validOtp == false && <p>Le code OTP n'est pas valide.</p>}
            <SignupPasswordCheck
                password={newPassword}
                onChange={onPasswordCheckHandler}
            />
        </div>
    )
}