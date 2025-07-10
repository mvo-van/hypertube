// import { useContext } from "react";
import styles from "./Label.module.css";
// import AppContext from "../../../store/AppContext";

function Label({ label, htmlFor, className, color="blue" }) {
  // const { theme } = useContext(AppContext);
  const themeStyle = styles[`label__${color}`];
  const classes = `${styles.label} ${themeStyle} ${className}`;

  return (
    <label htmlFor={htmlFor} className={classes}>
      {label}
    </label>
  );
}

export default Label;