import style from "./Button.module.css";

function getVariantStyle(color, variant) {
    return style[`button__${color}__${variant}`];
}

function Button({ onClick, type, variant, className, disabled = false, children, color="blue"}){
    const classes = `${style.button} ${getVariantStyle(color, variant)} round ${className}`;
    if (!onClick) {
        onClick = () => {};
    }

    return (
        <button 
            className={classes}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;