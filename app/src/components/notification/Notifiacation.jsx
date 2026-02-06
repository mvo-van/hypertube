import style from "./Notification.module.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function Notification({ visible, text, color }) {
  const iconGreen = <CheckCircleOutlineIcon />
  const iconRed = <CloseOutlinedIcon />
  if (!visible) {
    return <></>;
  }
  return <div className={`${style.notification} ${style[`natification__${color}`]}`}>
    {color == "green" && iconGreen}
    {color == "red" && iconRed}
    {text}
  </div>;
}