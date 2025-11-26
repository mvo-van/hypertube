import GenericPage from "../page/GenericPage";
import BubbleBackground from "../../components/background/BubbleBackground";
import style from "./ValidateSignup.module.css";
import MulticoText from "../../components/Text/MulticoText";
import Form from "../../components/form/Form";
import { useState } from "react";
import Input from "../../components/input/Input";
import { useAuth } from "../../context/userContext";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router";

function ValidateSignup() {
	const [code, setCode] = useState("");
	const numRegex = /^[0-9]*$/;
	const { getUser, deleteUser } = useAuth();
	const navigate = useNavigate();

	const onCodeHandler = (value) => {
		let test = numRegex.test(value);
		if (test) setCode(value);
		console.log(getUser().pseudo);
	};

	const onCodeValidate = (value) => {};

	const onClickHandlerQuit = () => {
		deleteUser();
		navigate(`/`);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
				<MulticoText className={style.titre} text="validation otp" />
				{/* Ajouter bouton pour recevoir un nouveau code ?? */}
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
			</BubbleBackground>
		</GenericPage>
	);
}

export default ValidateSignup;
