import { useRef, useState, useEffect } from "react";
import style from "./ChangePassword.module.css";
import Input from "../input/Input";
import SignupPasswordCheck, { checkPasswordStrong } from "../SignupCheck/SignupPasswordCheck";
import Form from "../form/Form";
import { api } from "../../common/api";
import useErrorManager from "../../hooks/useErrorManager";
import {
    ERROR_INVALID_MAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_INVALID_OTP_CODE,
    ERROR_UNKNOWN,
    ERROR_WEAK_PASSWORD,
    ERROR_OTP_EXPIRED,
} from "../../common/messages";
import { checkAuthConnected } from "../../common/checkAuth";
import { useNavigate } from "react-router";

export default function ChangePassword() {
    const [mail, setMail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const numRegex = /^[0-9]*$/;
    const [otpCode, setOtpCode] = useState("");
    const passwordIsCorrect = useRef();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const useError = useErrorManager();

    const getUserProfile = async () => {
        try {
            const resAuthConnected = await checkAuthConnected();
            if (resAuthConnected) {
                const res = await api.get(`/users/me`);
                setMail(res.data.email);
            }
        } catch (e) {
            useError.addInputError(ERROR_UNKNOWN);
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    const onClickChangePwd = async () => {
        if (isOpen == false) {
            setSuccess(false);
            try {
                const resAuthConnected = await checkAuthConnected();
                if (resAuthConnected) {
                    await api.post("/auth/forgot-password", {
                        email: mail
                    });
                } else {
                    navigate('/')
                }
            }
            catch (error) { useError.addInputError(ERROR_INVALID_MAIL); }
        }

        setIsOpen(true);
    };

    const onNewPasswordHandler = (value) => {
        setNewPassword(value);
        if (value) {
            useError.removeError(ERROR_INVALID_PASSWORD);
            useError.removeError(ERROR_WEAK_PASSWORD);
        }
    };

    const onNewPasswordValidate = (value) => {
        if (!value) useError.addInputError(ERROR_INVALID_PASSWORD);
        else useError.removeError(ERROR_INVALID_PASSWORD);
    };

    const onCodeHandler = (value) => {
        let test = numRegex.test(value);
        if (test) {
            setOtpCode(value);
            useError.removeError(ERROR_INVALID_OTP_CODE);
            useError.removeError(ERROR_OTP_EXPIRED);
        }
        else { useError.addInputError(ERROR_INVALID_OTP_CODE); }
    };

    const onCodeValidate = (value) => {
        if (!value || value.length < 6) useError.addInputError(ERROR_INVALID_OTP_CODE);
    };

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
        if (useError.hasInputErrors())
            return;

        if (mail && otpCode && otpCode.length == 6 && passwordIsCorrect.current) {
            if (checkPasswordStrong(newPassword) === false) {
                useError.addInputError(ERROR_WEAK_PASSWORD);
                return;
            }

            try {
                const resAuthConnected = await checkAuthConnected();
                if (resAuthConnected) {
                    await api.post("/auth/reset-password", {
                        email: mail,
                        otp_code: otpCode,
                        new_password: newPassword,
                    });
                    closeBox();
                } else {
                    navigate('/')
                }
            } catch (e) {
                if (e.response.data.message == "OTP has expired") {
                    useError.addInputError(ERROR_OTP_EXPIRED);

                    try {
                        await api.post("/auth/forgot-password", {
                            email: mail
                        });
                    }
                    catch (e) { useError.addInputError(ERROR_INVALID_OTP_CODE); }
                }
                else
                    useError.addInputError(ERROR_INVALID_OTP_CODE);
            }
        }
    };

    return (
        <div className={style.passwordChangeBox}>

            {isOpen == false && <button className={style.buttonConnexion} onClick={onClickChangePwd}>Réinitialiser le mot de passe</button>}
            {success == true && <p className={style.success}>Votre mot de passe a bien été modifié !</p>}
            {isOpen && <Form
                className={style.resetPasswordForm}
                onSubmit={onSubmitHandler}
                label="Reinitialiser"
                color="blue"
            >
                {useError.hasThisError(ERROR_UNKNOWN) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_UNKNOWN}
                    </div>
                )}
                {useError.hasThisError(ERROR_INVALID_MAIL) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_INVALID_MAIL}
                    </div>
                )}
                <Input
                    label="code otp reçu par mail"
                    type="string"
                    mode="numeric"
                    value={otpCode}
                    onChange={onCodeHandler}
                    onBlur={onCodeValidate}
                    color="blue"
                    maxLength={6}
                />
                {useError.hasThisError(ERROR_INVALID_OTP_CODE) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_INVALID_OTP_CODE}
                    </div>
                )}
                {useError.hasThisError(ERROR_OTP_EXPIRED) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_OTP_EXPIRED}
                    </div>
                )}
                <Input
                    label="nouveau mot de passe"
                    type="password"
                    value={newPassword}
                    onChange={onNewPasswordHandler}
                    onBlur={onNewPasswordValidate}
                    color="blue"
                    maxLength={72}
                />
                {useError.hasThisError(ERROR_INVALID_PASSWORD) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_INVALID_PASSWORD}
                    </div>
                )}
                {useError.hasThisError(ERROR_WEAK_PASSWORD) && (
                    <div className={style["invalid-alert"]}>
                        {ERROR_WEAK_PASSWORD}
                    </div>
                )}
            </Form>}
            <SignupPasswordCheck
                password={newPassword}
                onChange={onPasswordCheckHandler}
            />
        </div>
    )
}