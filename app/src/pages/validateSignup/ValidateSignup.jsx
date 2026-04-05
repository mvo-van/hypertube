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

function ValidateSignup() {
	const [pseudo, setPseudo] = useState("");
	const [code, setCode] = useState("");
	let invalid_otp = useRef();
	const numRegex = /^[0-9]*$/;
	const pseudoRegex = /^(?=.{3,}$)[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
	const navigate = useNavigate();


	const onPseudoHandler = (value) => {
		setPseudo(value);
		// const test = pseudoRegex.test(value);
		// TODO Verifier pseudo correct ?
	};

	const onPseudoValidate = (value) => {
		{
		}
	};

	const onCodeHandler = (value) => {
		let test = numRegex.test(value);
		if (test) {
			setCode(value);
			invalid_otp.current = false;
		}
	};

	const onCodeValidate = (value) => { };

	const onClickHandlerQuit = () => {
		navigate(`/`);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!pseudo || !code) {
			return;
		}
		try {
			await api.post("/users/validate", {
				username: pseudo,
				otp_code: code,
			});
			navigate(`/login`);
		} catch (e) {
			if (e.response.message == 400) invalid_otp.current = true;
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
				<Form
					onSubmit={onSubmitHandler}
					label="valider"
					direction="row"
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
				</Form>
				{invalid_otp == true && <p>Le code OTP n'est pas valide.</p>}
			</BubbleBackground>
		</GenericPage>
	);
}

export default ValidateSignup;
