import style from "./ButtonTrueFalse.module.css";

function ButtonTrueFalse({ onClick = () => { }, color = "blue", checked = false, label }) {
  const get_name_style = () => {
    if (checked === true) {
      return (`${checked}_${color}`)
    }
    return (`${checked}`)
  }


  return (
    <div onClick={onClick} className={`${style[get_name_style()]} ${style.trueFalse}`}>
      <p className={style.labeltf}>
        {label}
      </p>
    </div>
  );
}

export default ButtonTrueFalse;