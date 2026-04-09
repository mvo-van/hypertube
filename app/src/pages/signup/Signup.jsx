import style from "./Signup.module.css";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText";
import BubbleBackground from "../../components/background/BubbleBackground";
import { useRef, useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import SignupPasswordCheck, { checkPasswordStrong } from "../../components/SignupCheck/SignupPasswordCheck";
import useErrorManager from "../../hooks/useErrorManager";
import {
	ERROR_ALREADY_USED_MAIL,
	ERROR_NICKNAME,
	ERROR_WEAK_PASSWORD,
	ERROR_INVALID_CONF_PASSWORD,
	ERROR_INVALID_FIRST_NAME,
	ERROR_INVALID_LAST_NAME,
	ERROR_INVALID_MAIL,
	ERROR_INVALID_NICK,
	ERROR_INVALID_PASSWORD,
	ERROR_UNKNOWN,
} from "../../common/messages";
import { useNavigate } from "react-router";
import { api } from "../../common/api";
import Omniauth from "../../components/omniauth/Omniauth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alreadyUsedUsername, alreadyUsedMail } from "../../components/SignupCheck/SignupUserCheck";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const validPassword = useRef();
	const [pseudo, setPseudo] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const pseudoRegex = /^(?=.{3,20}$)[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
	const nameRegex = /^(?=.{2,20}$)[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
	const mailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,20}$/;

	const useError = useErrorManager();
	const navigate = useNavigate();

	const onFirstNameHandler = (value) => {
		setFirstName(value);
		const test = nameRegex.test(value);
		if (test == false) useError.addInputError(ERROR_INVALID_FIRST_NAME);
		else useError.removeError(ERROR_INVALID_FIRST_NAME);
	};

	const onFirstNameValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_FIRST_NAME);
	};

	const onLastNameHandler = (value) => {
		setLastName(value);
		const test = nameRegex.test(value);
		if (test == false) useError.addInputError(ERROR_INVALID_LAST_NAME);
		else useError.removeError(ERROR_INVALID_LAST_NAME);
	};

	const onLastNameValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_LAST_NAME);
	};

	const onMailHandler = (value) => {
		setEmail(value);
		const test = mailRegex.test(value);
		if (test == false) useError.addInputError(ERROR_INVALID_MAIL);
		else useError.removeError(ERROR_INVALID_MAIL);
		useError.removeError(ERROR_ALREADY_USED_MAIL);
	};

	const onMailValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_MAIL);
	};

	const onPseudoHandler = (value) => {
		setPseudo(value);
		const test = pseudoRegex.test(value);
		if (test == false) useError.addInputError(ERROR_INVALID_NICK);
		else useError.removeError(ERROR_INVALID_NICK);
		useError.removeError(ERROR_NICKNAME);
	};

	const onPseudoValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_NICK);
	};

	const onPasswordHandler = (value) => {
		setPassword(value);
		if (value) {
			useError.removeError(ERROR_INVALID_PASSWORD);
			useError.removeError(ERROR_WEAK_PASSWORD);
		}
	};

	const onPasswordValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_PASSWORD);
		else useError.removeError(ERROR_INVALID_PASSWORD);
	};

	const onConfPasswordHandler = (value) => {
		setConfPassword(value);
		if (value != password)
			useError.addInputError(ERROR_INVALID_CONF_PASSWORD);
		else useError.removeError(ERROR_INVALID_CONF_PASSWORD);
	};

	const onConfPassWordValidate = (value) => {
		if (!value) useError.addInputError(ERROR_INVALID_CONF_PASSWORD);
	};

	const onPasswordCheckHandler = (value) => {
		validPassword.current = value;
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (
			!firstName ||
			!lastName ||
			!email ||
			!pseudo ||
			!password ||
			!confPassword ||
			!validPassword.current ||
			useError.hasInputErrors()
		)
			return;

		if (password != confPassword) {
			onConfPasswordHandler(confPassword);
			return;
		}

		if (checkPasswordStrong(password) === false) {
			useError.addInputError(ERROR_WEAK_PASSWORD);
			return;
		}

		if (await alreadyUsedMail(email) == true) {
			useError.addInputError(ERROR_ALREADY_USED_MAIL);
			return;
		}
		if (await alreadyUsedUsername(pseudo) == true) {
			useError.addInputError(ERROR_NICKNAME);
			return;
		}
		try {
			await api.post("/users", {
				username: pseudo,
				first_name: firstName,
				last_name: lastName,
				email,
				password,
				auth_strategy: "local",
				language: navigator.language.split("-")[0] || null,
			});
			await api.post("/users/activate", {
				username: pseudo,
			});
			navigate(`/validate-signup`);
		} catch (error) {
			useError.addInputError(ERROR_UNKNOWN);
		}
	};

	const goBackHandler = () => {
		navigate("/")
	}

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
				<ArrowBackIcon className={style.arrow} onClick={goBackHandler} />
				<MulticoText className={style["titre"]} text="Inscription" />
				<div className={style["button-box"]}>
					{useError.hasThisError(ERROR_UNKNOWN) && (
						<div className={style["invalid-alert"]}>
							{ERROR_UNKNOWN}
						</div>
					)}
					<Form
						className="login-form"
						onSubmit={onSubmitHandler}
						label="valider"
						direction="row"
						color="yellow"
					>
						<div>
							<Input
								label="prenom"
								type="string"
								value={firstName}
								onChange={onFirstNameHandler}
								onBlur={onFirstNameValidate}
								color="yellow"
								maxLength={20}
							/>
							{useError.hasThisError(ERROR_INVALID_FIRST_NAME) && (
								<div className={style["invalid-alert"]}>
									{ERROR_INVALID_FIRST_NAME}
								</div>
							)}
						</div>

						<div>
							<Input
								label="nom"
								type="string"
								value={lastName}
								onChange={onLastNameHandler}
								onBlur={onLastNameValidate}
								color="yellow"
								maxLength={20}
							/>
							{useError.hasThisError(ERROR_INVALID_LAST_NAME) && (
								<div className={style["invalid-alert"]}>
									{ERROR_INVALID_LAST_NAME}
								</div>
							)}
						</div>

						<div>
							<Input
								label="adresse mail"
								type="email"
								value={email}
								onChange={onMailHandler}
								onBlur={onMailValidate}
								color="yellow"
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
						</div>

						<div>
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
							{useError.hasThisError(ERROR_NICKNAME) && (
								<div className={style["invalid-alert"]}>
									{ERROR_NICKNAME}
								</div>
							)}
						</div>

						<div>
							<Input
								label="mot de passe"
								type="password"
								value={password}
								onChange={onPasswordHandler}
								onBlur={onPasswordValidate}
								color="yellow"
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
						</div>

						<div>
							<Input
								label="confirmation"
								type="password"
								value={confPassword}
								onChange={onConfPasswordHandler}
								onBlur={onConfPassWordValidate}
								color="yellow"
								maxLength={72}
							/>
							{useError.hasThisError(
								ERROR_INVALID_CONF_PASSWORD
							) && (
									<div className={style["invalid-alert"]}>
										{ERROR_INVALID_CONF_PASSWORD}
									</div>
								)}
						</div>

						<SignupPasswordCheck
							password={password}
							onChange={onPasswordCheckHandler}
						/>
					</Form>
					<hr className={style.line} />
					<Omniauth />

				</div>
			</BubbleBackground>
		</GenericPage>
	);
}

export default Signup;
