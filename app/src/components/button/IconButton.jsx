import styles from "./IconButton.module.css";

function IconButton({ 
    label, 
    color, 
    onClick = () => {},
    src
}) 
{
    console.log(src)
    return (
        <button className={styles.iconButton} onClick={onClick}>
            <img src={src} className={styles.imgButton} alt="me"/>
            <span className={`${styles[`color__${color}`]} ${styles.text}`}>{label}</span>
        </button>
    );
}

export default IconButton;