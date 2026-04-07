import React, { useContext, useImperativeHandle, useRef } from "react";
import styles from "./InputRange.module.css";
import { Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 0;

const InputRange = React.forwardRef(({
  label,
  value,
  double = false,
  min = 0,
  max = 100,
  step = 1,
  onChange = () => { },
  onBlur = () => { },
  color = "lighter_gray"
}, ref) => {
  const onChangeHandler = (event) => {
    onChange(event.target.value);
  }

  const inputColor = styles[`input__${color}`];
  const valueInputColor = styles[`valueInput__${color}`];
  const name = label.replace(/ /g, "_");
  const id = `input-${name}`;



  if (!double) {
    return (
      <div className={styles.input}>
        <div className={styles["input__label"]}>{label}</div>
        <Slider
          id={id}
          className={`${styles["input"]} ${inputColor} round`}
          name={name}
          type="range"
          min={min}
          max={max}
          value={value}
          step={5}
          sx={{ color: "#f0f0f0", opacity: "0.7" }}
          onChange={onChangeHandler}
        />
        <div className={`${styles["valueInput"]} ${valueInputColor}`}>{value}/{max}</div>
      </div>
    );
  }
  else {
    return (
      <div className={styles.input}>
        <div className={styles["input__label"]}>{label}</div>
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
          sx={{ color: "#f0f0f0", opacity: "0.7" }}
          step={1}
        />
        <div className={`${styles["valueInput"]} ${valueInputColor}`}>{value[0]}-{value[1]}</div>
      </div>
    );
  }

})

export default InputRange;