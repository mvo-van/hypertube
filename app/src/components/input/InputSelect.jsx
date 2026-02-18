import styles from "./InputSelect.module.css"
import { MenuItem, Select } from "@mui/material";

export default function InputSelect({ label = "test", id = 0, color = "lighter_gray", value, options = [{}], onChange = {}, selectVoid = true }) {
  const tagId = `tags-${id}`

  return (
    <div className={styles.input}>
      <div className={styles[`input__label_${color}`]} >{label}</div>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={value}
        onChange={onChange}
        autoWidth
        label={label}
        sx={{ height: 40, backgroundColor: "#BFBFBF", color: "black", borderRadius: "10px" }}
      >
        {selectVoid && <MenuItem sx={{ width: 230, height: 30, fontFamily: 'Basic' }} value="">
        </MenuItem>}
        {options.map(option => <MenuItem value={option.label} sx={{ width: 230, fontFamily: 'Basic' }}>{option.name}</MenuItem>)}
      </Select>
    </div>

  );
}
