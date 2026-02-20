import { useNavigate } from "react-router";
import Button from "../../components/button/Button";
import style from "./Home.module.css"
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText"
import BubbleBackground from "../../components/background/BubbleBackground";

function Home() {
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(e.target.attributes.action.nodeValue)
  }

  return (
    <GenericPage className={style.home}>
      <BubbleBackground>
        <MulticoText className={style["titre"]} text="Hypertube" />
        <div className={style["button-box"]}>

          <form action="/login" onSubmit={onSubmitHandler}>
            <Button variant="regular" type="submit" color="blue">connexion</Button>
          </form>
          <form action="/signup" onSubmit={onSubmitHandler}>
            <Button variant="regular" type="submit" color="yellow">inscription</Button>
          </form>
        </div>
      </BubbleBackground>
    </GenericPage>
  );
}

export default Home;
