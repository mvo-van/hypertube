import GenericPage from "../page/GenericPage";
import BubbleBackground from "../../components/background/BubbleBackground";
import style from "./ValidateSignup.module.css";
import MulticoText from "../../components/Text/MulticoText";
import Form from "../../components/form/Form";
import { useState } from "react";
import Input from "../../components/input/Input";

function ValidateSignup() {
	const [code, setCode] = useState("");
	const numRegex = /^[0-9]*$/;

	const onCodeHandler = (value) => {
		let test = numRegex.test(value);
		if (test) setCode(value);
	};

	const onCodeValidate = (value) => {};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<GenericPage className={style.home}>
			<BubbleBackground>
				<MulticoText className={style.titre} text="validation otp" />
				{/* Ajouter bouton pour recevoir un nouveau code ?? */}
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
