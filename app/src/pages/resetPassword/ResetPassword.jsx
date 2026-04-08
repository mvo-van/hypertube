import GenericPage from "../page/GenericPage";
import BubbleBackground from "../../components/background/BubbleBackground";
import style from "./ResetPassword.module.css";
import MulticoText from "../../components/Text/MulticoText";
import Form from "../../components/form/Form";
import { useRef, useState } from "react";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router";
import { api } from "../../common/api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignupPasswordCheck from "../../components/SignupCheck/SignupPasswordCheck";
import useErrorManager from "../../hooks/useErrorManager";
import {
    ERROR_INVALID_MAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_INVALID_OTP_CODE,
    ERROR_UNKNOWN,
} from "../../common/messages";

function ResetPasswordLogin() {
    const [otpReceived, setOtpReceived] = useState(false);
    const [mail, setMail] = useState("");
    const [otpCode, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const passwordIsCorrect = useRef();
    const [success, setSuccess] = useState(false);
    const mailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const numRegex = /^[0-9]*$/;

    const useError = useErrorManager();
    const navigate = useNavigate();


    const onMailHandler = (value) => {
        setMail(value);
        const test = mailRegex.test(value);
        if (test == false) useError.addInputError(ERROR_INVALID_MAIL);
        else useError.removeError(ERROR_INVALID_MAIL);
    };

    const onMailValidate = (value) => {
        if (!value) useError.addInputError(ERROR_INVALID_MAIL);
    };

    const onCodeHandler = (value) => {
        let test = numRegex.test(value);
        if (test) {
            setCode(value);
            useError.removeError(ERROR_INVALID_OTP_CODE);
        }
        else { useError.addInputError(ERROR_INVALID_OTP_CODE); }
    };

    const onCodeValidate = (value) => {
        if (!value || value.length < 6) useError.addInputError(ERROR_INVALID_OTP_CODE);
    };


    const onNewPasswordHandler = (value) => {
        setNewPassword(value);
        if (value) useError.removeError(ERROR_INVALID_PASSWORD);
    };

    const onNewPasswordValidate = (value) => {
        if (!value) useError.addInputError(ERROR_INVALID_PASSWORD);
        else useError.removeError(ERROR_INVALID_PASSWORD);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!mail && useError.hasInputErrors())
            return;
        if (otpReceived == false) {
            try {
                await api.post("/auth/forgot-password", {
                    email: mail
                });
                setOtpReceived(true);
            }
            catch (e) {
                useError.addInputError(ERROR_INVALID_MAIL);
            }
        }
        else if (otpCode && otpCode.length == 6 && passwordIsCorrect.current) {
            try {
                await api.post("/auth/reset-password", {
                    email: mail,
                    otp_code: otpCode,
                    new_password: newPassword,
                });
                setSuccess(true);
                navigate(`/login`);
            } catch (e) {
                useError.addInputError(ERROR_INVALID_OTP_CODE);
            }
        }
    };

    const onPasswordCheckHandler = (value) => {
        passwordIsCorrect.current = value;
    };

    const goBackHandler = () => {
        navigate("/login")
    }

    return (
        <GenericPage className={style.home}>
            <BubbleBackground>
                <ArrowBackIcon className={style.arrow} onClick={goBackHandler} />
                <MulticoText className={style.titre} text="Mot de passe oublié" />
                <div className={style.desc}>
                    Entrez votre mail pour pouvoir changer votre mot de passe
                </div>
                <Form
                    onSubmit={onSubmitHandler}
                    label="valider"
                    direction="column"
                    color="blue"
                >
                    <Input
                        label="mail"
                        type="email"
                        value={mail}
                        onChange={onMailHandler}
                        onBlur={onMailValidate}
                        color="blue"
                        maxLength={320}
                    />
                    {useError.hasThisError(ERROR_INVALID_MAIL) && (
                        <div className={style["invalid-alert"]}>
                            {ERROR_INVALID_MAIL}
                        </div>
                    )}
                    {otpReceived == true && <Input
                        label="code otp reçu par mail"
                        type="string"
                        mode="numeric"
                        value={otpCode}
                        onChange={onCodeHandler}
                        onBlur={onCodeValidate}
                        color="blue"
                        maxLength={6}
                    />}
                    {useError.hasThisError(ERROR_INVALID_OTP_CODE) && (
                        <div className={style["invalid-alert"]}>
                            {ERROR_INVALID_OTP_CODE}
                        </div>
                    )}
                    {otpReceived == true && <Input
                        label="nouveau mot de passe"
                        type="password"
                        value={newPassword}
                        onChange={onNewPasswordHandler}
                        onBlur={onNewPasswordValidate}
                        color="blue"
                        maxLength={64}
                    />}
                    {useError.hasThisError(ERROR_INVALID_PASSWORD) && (
                        <div className={style["invalid-alert"]}>
                            {ERROR_INVALID_PASSWORD}
                        </div>
                    )}
                </Form>
                {success == true && <p>Votre mot de passe a bien ete modifie !</p>}
                <SignupPasswordCheck
                    password={newPassword}
                    onChange={onPasswordCheckHandler}
                />
            </BubbleBackground>
        </GenericPage>
    );
}

export default ResetPasswordLogin;
