import style from "./Login.module.css";
// import HomeBackground from "../../components/home/HomeBackground";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText";
import BubbleBackground from "../../components/background/BubbleBackground";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import axios from "axios";
import { api } from "../../common/api";

function Login() {
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");

	const onPseudoHandler = (value) => {
		setPseudo(value);
	};

	const onPseudoValidate = (value) => {};

	const onPasswordHandler = (value) => {
		setPassword(value);
	};

	const onPassWordValidate = (value) => {};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		await api.post("/auth/login", {
			username: pseudo,
			password: password,
		});
	};

	const sendOtp = async () => {};

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
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
						/>

						<Input
							label="mot de passe"
							type="password"
							value={password}
							onChange={onPasswordHandler}
							onBlur={onPassWordValidate}
							color="blue"
						/>
						<a
							href="#"
							onClick={() => sendOtp()}
							className={style.pwdlink}
						>
							Mot de Passe oublié
						</a>
					</Form>

					<hr className={style.line} />
					<p className={style.titreOmni}>Omniauth</p>
				</div>
			</BubbleBackground>
		</GenericPage>
	);
}

export default Login;
