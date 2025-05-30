import { useTheme } from "../../../hooks/use-theme";
import Icon from "../icons/Icon";
import styles from "./IconButton.module.css";

function IconButton({ 
    label, 
    variant,
    iconColor, 
    onClick = () => {}, 
    className, 
    ...props 
}) 
{
    const theme = useTheme();
    const iconFill = styles[`button__icon__${theme}`];
    const classes = `${styles['button']} ${styles[`button-color__${theme}`]} ${className}`;

    return (
        <button className={classes}>
            <Icon
                variant="error"
                className={`${styles['button__icon']} ${iconFill}`}
                iconColor={iconColor}
            />
            <span className={styles[`button__label__${theme}`]}>{label}</span>
        </button>
    );
}

export default IconButton;