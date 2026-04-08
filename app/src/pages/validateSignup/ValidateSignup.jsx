import GenericPage from "../page/GenericPage";
import BubbleBackground from "../../components/background/BubbleBackground";
import style from "./ValidateSignup.module.css";
import MulticoText from "../../components/Text/MulticoText";
import Form from "../../components/form/Form";
import { useRef, useState } from "react";
import Input from "../../components/input/Input";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { api } from "../../common/api";
import {
	ERROR_INVALID_NICK,
	ERROR_INVALID_OTP_CODE,
	ERROR_OTP_EXPIRED,
	ERROR_UNKNOWN,
} from "../../common/messages";
import useErrorManager from "../../hooks/useErrorManager";

function ValidateSignup() {
	const [pseudo, setPseudo] = useState("");
	const [code, setCode] = useState("");
	const numRegex = /^[0-9]*$/;

	const useError = useErrorManager();
	const navigate = useNavigate();

	const onPseudoHandler = (value) => {
		setPseudo(value);
		if (value.length >= 3) useError.removeError(ERROR_INVALID_NICK);
		else useError.addInputError(ERROR_INVALID_NICK);
	};

	const onPseudoValidate = (value) => {
		if (!value || value.length < 3) useError.addInputError(ERROR_INVALID_NICK);
		else useError.removeError(ERROR_INVALID_NICK);
	};

	const onCodeHandler = (value) => {
		let test = numRegex.test(value);
		if (test) {
			setCode(value);
			useError.removeError(ERROR_INVALID_OTP_CODE);
			useError.removeError(ERROR_OTP_EXPIRED);
		}
		else { useError.addInputError(ERROR_INVALID_OTP_CODE); }
	};

	const onCodeValidate = (value) => {
		if (!value || value.length < 6) useError.addInputError(ERROR_INVALID_OTP_CODE);
	};

	const onClickHandlerQuit = () => {
		navigate(`/`);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (useError.hasInputErrors() || !pseudo || !code) {
			return;
		}
		try {
			await api.post("/users/validate", {
				username: pseudo,
				otp_code: code,
			});
			navigate(`/login`);
		} catch (e) {
			if (e.response.data.message == "OTP code expired")
				useError.addInputError(ERROR_OTP_EXPIRED);
			else
				useError.addInputError(ERROR_INVALID_OTP_CODE);
		}
		if (useError.hasThisError(ERROR_OTP_EXPIRED)) {
			try {
				await api.post("/users/activate", { // TODO non fonctionnel
					username: pseudo,
				});
			}
			catch (e) { useError.addInputError(ERROR_INVALID_NICK); }
		}
	};

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
				<MulticoText className={style.titre} text="validation otp" />
				<div className="menu">
					<Logout
						sx={{ fontSize: 35, color: "#EB7879" }}
						onClick={onClickHandlerQuit}
						className={style.logout}
					/>
				</div>
				<div className={style.desc}>
					Veuillez entrer le code reçu par e-mail
				</div>
				{useError.hasThisError(ERROR_OTP_EXPIRED) && (
					<div className={style["invalid-alert"]}>
						{ERROR_OTP_EXPIRED}
					</div>
				)}
				<Form
					onSubmit={onSubmitHandler}
					label="valider"
					direction="column"
					color="yellow"
				>
					<Input
						label="pseudo"
						type="string"
						value={pseudo}
						onChange={onPseudoHandler}
						onBlur={onPseudoValidate}
						color="yellow"
						maxLength={20}
					/>
					{useError.hasThisError(ERROR_INVALID_NICK) && (
						<div className={style["invalid-alert"]}>
							{ERROR_INVALID_NICK}
						</div>
					)}
					<Input
						label="code"
						type="string"
						mode="numeric"
						value={code}
						onChange={onCodeHandler}
						onBlur={onCodeValidate}
						color="yellow"
						maxLength={6}
					/>
					{useError.hasThisError(ERROR_INVALID_OTP_CODE) && (
						<div className={style["invalid-alert"]}>
							{ERROR_INVALID_OTP_CODE}
						</div>
					)}
				</Form>
			</BubbleBackground>
		</GenericPage>
	);
}

export default ValidateSignup;
