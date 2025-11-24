import styles from "./InputTags.module.css"
import Label from "../label/Label";


export default function InputChoice({label, id=0, color, value}) {
  return (
	<div className={styles.input}>
      <input name={label}/>
	</div>

  );
}