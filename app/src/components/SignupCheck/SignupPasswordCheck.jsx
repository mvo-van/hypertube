import styles from "./SignupPasswordCheck.module.css";
import React, { useEffect } from "react";

export default function SignupPasswordCheck ({ password, onChange = () => {}}) {
	if (!password)
		return;
	// const passwordRegexNumber = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,24}$/;
	const lengthRegex = /^.{12,24}$/;
	const uppercaseRegex = /[A-Z]/;
	const lowercaseRegex = /[a-z]/;
	const digitRegex = /\d/;
	const specialCharRegex = /[^A-Za-z0-9]/;

	const isLongEnough = lengthRegex.test(password);
	const hasUppercase = uppercaseRegex.test(password);
	const hasLowercase = lowercaseRegex.test(password);
	const hasDigit = digitRegex.test(password);
	const hasSpecialChar = specialCharRegex.test(password);

	const onChangeHandler = (value) => {
		onChange(value);
	}

	if (isLongEnough && hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
		onChangeHandler(true)
		return;
	}
	else {
		onChangeHandler(false);
	}

	return (
		<div className={styles.password_box}>
			<div className={styles.password_desc}>
				Votre mot de passe doit comporter au moins :
			</div>
			<ul className={styles.password_list}>
				<li
					className={
						isLongEnough
							? styles.requirement_true
							: styles.requirement_false
					}
				>
					{isLongEnough ? "✅" : "❌"} 12 caractères
				</li>
				<li
					className={
						hasUppercase
							? styles.requirement_true
							: styles.requirement_false
					}
				>
					{hasUppercase ? "✅" : "❌"} 1 majuscule
				</li>
				<li
					className={
						hasLowercase
							? styles.requirement_true
							: styles.requirement_false
					}
				>
					{hasLowercase ? "✅" : "❌"} 1 minuscule
				</li>
				<li
					className={
						hasDigit
							? styles.requirement_true
							: styles.requirement_false
					}
				>
					{hasDigit ? "✅" : "❌"} 1 chiffre
				</li>
				<li
					className={
						hasSpecialChar
							? styles.requirement_true
							: styles.requirement_false
					}
				>
					{hasSpecialChar ? "✅" : "❌"} 1 caractère spécial
				</li>
			</ul>
		</div>
	);
};
