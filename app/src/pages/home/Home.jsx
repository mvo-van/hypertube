import { useNavigate, useSearchParams } from "react-router";
import Button from "../../components/button/Button";
import style from "./Home.module.css"
import GenericPage from "../page/GenericPage";
import MulticoText from "../../components/Text/MulticoText"
import BubbleBackground from "../../components/background/BubbleBackground";
import { useEffect, useState } from "react";
import Notification from "../../components/notification/Notifiacation";

function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(e.target.attributes.action.nodeValue)
  }

  useEffect(() => {
    if (searchParams.get("error") == "true") {
      setError(true)
      setTimeout(() => { setError(false); setSearchParams({}); }, 5000);
    }
  }, [searchParams]);

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
        <Notification visible={error} color={"red"} text={"mail deja utilisé"} />
      </BubbleBackground>
    </GenericPage>
  );
}

export default Home;
