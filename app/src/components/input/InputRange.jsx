import React, { useContext, useImperativeHandle, useRef } from "react";
import styles from "./InputRange.module.css";
// import AppContext from "../../../store/AppContext";
import Label from "../label/Label";
import { Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 0;

const InputRange = React.forwardRef(({ 
  label,
  value,
  double=false,
  min=0,
  max=100,
  step=1,
  onChange = () => {},
  onBlur = () => {},
  color = "blue"
}, ref) => {
  // const { theme } = useContext(AppContext);
  const onChangeHandler = (event) => {
    onChange(event.target.value);
  }

  const inputColor = styles[`input__${color}`];
  const name = label.replace(/ /g, "_");
  const id = `input-${name}`;

  // const [value1, setValue1] = React.useState([min, max]);


  if (!double) {
    return (
      <div className={styles.input}>
        <Label label={label} htmlFor={id} className={styles["input__label"]} color={color}/>
        <input 
          id = {id}
          className={`${styles["input"]} ${inputColor} round`}
          name={name}
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={onChangeHandler}
        />
        <div className={styles[`valueInput__${color}`]}>{value} / 100</div>
      </div>
    );
  }
  else {
    return(
      <div className={styles.input}>
        <Label label={label} htmlFor={id} className={styles["input__label"]} color={color}/>
        <Slider
          className={`${styles["input"]} ${inputColor} round`}
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={min}
          max={max}
          sx={{ color: "#EBE978", opacity: "0.7" }}
          step={1}
        />
        <div className={styles[`valueInput__${color}`]}>{value[0]}-{value[1]}</div>
      </div>
    );
  }

})

export default InputRange;