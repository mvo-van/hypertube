import styles from "./Omniauth.module.css";
import google from "../../assets/images/google.png"
import fortytwo from "../../assets/images/fortytwo.png"
import github from "../../assets/images/github.png"
import gitlab from "../../assets/images/gitlab.png"
import discord from "../../assets/images/discord.png"
import spotify from "../../assets/images/spotify.png"
function Omniauth({ className, label, onSubmit, disabled = false, children, color="blue", direction="column"}) {
  const formClasses = `${styles.form} ${className}`;

  return (
    <div className={styles.omniauthDiv}>
      <p className={styles.titreOmni}>Omniauth</p>
      <div className={styles.omniauthIconeDiv}>
        <form action="http://localhost:3000/auth/google" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={google}/></button>
        </form>
        <form action="http://localhost:3000/auth/fortytwo" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={fortytwo}/></button>
        </form>
        <form action="http://localhost:3000/auth/github" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={github}/></button>
        </form>
        <form action="http://localhost:3000/auth/gitlab" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={gitlab}/></button>
        </form>
        <form action="http://localhost:3000/auth/discord" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={discord}/></button>
        </form>
        <form action="http://localhost:3000/auth/spotify" method="get">
          <button className={styles.buttonOauth} type="submit"><img className={styles.imgOauth} src={spotify}/></button>
        </form>
      </div>

    </div>
  );
}

export default Omniauth;