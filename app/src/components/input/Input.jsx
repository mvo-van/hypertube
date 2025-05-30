import React, { useContext, useImperativeHandle, useRef } from "react";
import styles from "./Input.module.css";
// import AppContext from "../../../store/AppContext";
import Label from "../label/Label";

const Input = React.forwardRef(({ 
    label,
    type,
    value,
    onChange = () => {},
    onBlur = () => {},
    placeholder,
    color = "blue"
}, ref) => {
    // const { theme } = useContext(AppContext);
    const onChangeHandler = (event) => {
        onChange(event.target.value);
    }
    const onBlurHandler = (event) => {
        onBlur(event.target.value);
    }
    const inputRef = useRef();
    const inputColor = styles[`input__input__${color}`];
    const name = label.replace(/ /g, "_");
    const id = `input-${name}`;
    
    useImperativeHandle(ref, () => {
        return { 
            focus: () => {
                inputRef.current.focus();
            } 
        }
    });
    
    return (
        <div className={styles.input}>
            <Label label={label} htmlFor={id} className={styles['input__label']} color={color}/>
            <input 
                id = {id}
                className={`${styles['input__input']} ${inputColor} round`}
                name={name} 
                type={type}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                ref={inputRef}
                placeholder={placeholder}
                autoComplete="off"
            />
        </div>
    );
})

export default Input;