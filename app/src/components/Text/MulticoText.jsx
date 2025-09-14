import style from "./MulticoText.module.css";

function MulticoText({className, text, styleSize}){
  return (
    <div className={`${style.text_box} ${className} ${style[`text_color`]} `}>
      {text}
    </div>
  );
}

export default MulticoText;