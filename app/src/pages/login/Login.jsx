import style from "./Login.module.css"
// import HomeBackground from "../../components/home/HomeBackground";
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText"
import BubbleBackground from "../../components/background/BubbleBackground";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onMailHandler = (value) => {
        setEmail(value);
    }
    
    const onMailValidate = (value) => {
    }

    const onPasswordHandler = (value) => {
        setPassword(value);
    }

    const onPassWordValidate = (value) => {
    }

    const onSubmitHandler = async (e) => {
    }

    const sendOtp = async() => {
    } 


    return (
        <GenericPage className={style.home}>
                <BubbleBackground>
                    <MulticoText className={style['titre']} text="Connection"/>
                    <div className={style['button-box']}>

                        <Form className="login-form" onSubmit={onSubmitHandler} label="valider" color="yellow">
                            <Input
                                label="mail"
                                type="email"
                                value={email}
                                onChange={onMailHandler}
                                onBlur={onMailValidate}
                                color="blue"
                            />
                            
                            <Input
                                label="mot de passe"
                                type="password"
                                value={password}
                                onChange={onPasswordHandler}
                                onBlur={onPassWordValidate}
                                color="blue_to_yellow_2"
                            />
                            <a href="#" onClick={() => sendOtp()} className={style.pwdlink}>
                                Mot de Passe oublié
                            </a>
                        </Form>

                        <hr className={style.line}/>
                        <p className={style.titreOmni}>Omniauth</p>
                    </div>
                </BubbleBackground>
        </GenericPage>
    );
}

export default Login;
