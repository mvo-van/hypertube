import style from "./MulticoText.module.css";

function MulticoText({className, text}){
    let string = [];
    for (let i = 0; i<text.length; i++){
      string.push(<a className={style[`text_color_${i%12}`]}>{text[i]}</a>)
    }

    return (
        <div className={style.text_box}>
            {string}
        </div>
    );
}

export default MulticoText;