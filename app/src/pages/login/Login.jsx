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

function Login() {
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const onPseudoHandler = (value) => {
		setPseudo(value);
	};

	const onPseudoValidate = (value) => { };

	const onPasswordHandler = (value) => {
		setPassword(value);
	};

	const onPassWordValidate = (value) => { };

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!pseudo || !password) {
			return;
		}
		try {
			await api.post("/auth/login", {
				username: pseudo,
				password: password,
			});
			navigate(`/feed`);
		} catch (error) {
			if (error.response && error.response.message && error.response.message && error.response.data.message == "User is not active") {
				navigate(`/validate-signup`); // check why it doesnt work anymore
			}
			console.log(error)
		}
	};

	const goBackHandler = () => {
		navigate("/")
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

						<Input
							label="mot de passe"
							type="password"
							value={password}
							onChange={onPasswordHandler}
							onBlur={onPassWordValidate}
							color="blue"
							maxLength={64}
						/>
						<a
							href="/reset-password"
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
