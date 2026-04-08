import style from "./Login.module.css";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText";
import BubbleBackground from "../../components/background/BubbleBackground";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { api } from "../../common/api";
import { useNavigate } from "react-router";
import Omniauth from "../../components/omniauth/Omniauth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useErrorManager from "../../hooks/useErrorManager";
import {
	ERROR_INVALID_NICK,
	ERROR_INVALID_PASSWORD,
	ERROR_UNKNOWN,
} from "../../common/messages";

function Login() {
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");

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

	const onPasswordHandler = (value) => {
		setPassword(value);
		if (value) useError.removeError(ERROR_INVALID_PASSWORD);
	};

	const onPasswordValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_PASSWORD);
		else useError.removeError(ERROR_INVALID_PASSWORD);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (useError.hasInputErrors() || !pseudo || !password) {
			return;
		}
		try {
			await api.post("/auth/login", {
				username: pseudo,
				password: password,
			});
			navigate(`/feed`);
		} catch (error) {
			if (error.response.data.message == "User is not active") {
				navigate(`/validate-signup`);
			}
			else
				useError.addInputError(ERROR_INVALID_PASSWORD);
		}
	}

	const goBackHandler = () => {
		navigate("/")
	}

	const resetPassword = () => {
		navigate("/reset-password")
	}

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
				<ArrowBackIcon className={style.arrow} onClick={goBackHandler} />
				<MulticoText className={style["titre"]} text="Connexion" />
				<div className={style["button-box"]}>
					<Form
						className="login-form"
						onSubmit={onSubmitHandler}
						label="Connexion"
						color="blue"
					>
						<Input
							label="pseudo"
							type="string"
							value={pseudo}
							onChange={onPseudoHandler}
							onBlur={onPseudoValidate}
							color="blue"
							maxLength={20}
						/>
						{useError.hasThisError(ERROR_INVALID_NICK) && (
							<div className={style["invalid-alert"]}>
								{ERROR_INVALID_NICK}
							</div>
						)}

						<Input
							label="mot de passe"
							type="password"
							value={password}
							onChange={onPasswordHandler}
							onBlur={onPasswordValidate}
							color="blue"
							maxLength={72}
						/>
						{useError.hasThisError(ERROR_INVALID_PASSWORD) && (
							<div className={style["invalid-alert"]}>
								{ERROR_INVALID_PASSWORD}
							</div>
						)}
						<a
							onClick={resetPassword}
							className={style.pwdlink}
						>
							Mot de Passe oublié
						</a>
					</Form>

					<hr className={style.line} />
					<Omniauth />
				</div>
			</BubbleBackground>
		</GenericPage>
	);
}

export default Login;
