import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./InputTags.module.css"
import Label from "../label/Label";
import { createTheme, ThemeProvider } from "@mui/material";

export default function InputTags({label="test", id=0, color="lighter_gray", options=[],value, onChange={}}) {
  const tagId = `tags-${id}`

    const theme = createTheme({
    typography: {
      fontFamily: 'Basic, sans-serif',
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
          label: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
          label: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
          label: ({ theme }) => ({
            fontFamily: theme.typography.fontFamily,
          }),
        },
      },
    },
  });



  return (
    <div className={styles.input}>
      <div className={styles[`input__label_${color}`]} >{label}</div>
      <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        id={tagId}
        sx={{ outlineColor: "red", background: "#f0f0f0", borderRadius: "10px", opacity: "0.7", fontFamily: "Basic"}}
        size="small"
        // options={options.map((option) => option.name)}
        options={options}
        defaultValue={value}
        value={value}
        freeSolo
        limitTags={2}
        onChange={onChange}
        renderOption={(props, option) => (
          <li {...props} style={{ fontFamily: 'Basic' }}>
            {option}
          </li>
        )}
        renderValue={(value, getItemProps) =>
          value.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return (
              <Chip variant="outlined" sx={{height: "25px", fontFamily: "Basic"}} label={option} key={key} {...itemProps} className={styles.chipstyle}/>
            );
          })
        }
        renderInput={(params) => (
          <TextField 
            {...params}
          />
        )}
      />
      </ThemeProvider>
    </div>

  );
}
