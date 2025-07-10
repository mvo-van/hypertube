import Button from "../button/Button";
import styles from "./Form.module.css";

function Form({ className, label, onSubmit, disabled = false, children, color="blue", direction="column"}) {
  const formClasses = `${styles.form} ${className}`;

  return (
    <form className={formClasses} onSubmit={onSubmit}>
      <div className={styles[`form__${direction}`]}>
        {children}
      </div>
      <div className={styles.div__submit}>
        <Button 
          type="submit"
          variant="validation"
          className={styles["form__submit"]}
          disabled={disabled}
          color={color}
        >
          {label}
        </Button>
      </div>

    </form>
  );
}

export default Form;