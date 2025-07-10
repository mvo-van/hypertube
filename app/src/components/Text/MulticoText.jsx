import style from "./MulticoText.module.css";

function MulticoText({className, text, styleSize}){
  let string = [];
  for (let i = 0; i<text.length; i++){
    string.push(<a key={i}  className={`${style[`text_color_${i%12}`]} `} style={styleSize}>{text[i]}</a>)
  }
  return (
    <div className={`${style.text_box} ${className}`}>
      {string}
    </div>
  );
}

export default MulticoText;