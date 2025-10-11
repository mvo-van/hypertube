import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./InputTags.module.css"
import Label from "../label/Label";
const filter = createFilterOptions();
export default function InputSoloText({label="test", id=0, color="lighter_gray", options=[],value, onChange={}, onBlur={}}) {
  const tagId = `tags-${id}`

  return (
    <div className={styles.input}>
      <div className={styles[`input__label_${color}`]} >{label}</div>
      <Autocomplete
        freeSolo
        id={tagId}
        sx={{ outlineColor: "red", background: "#f0f0f0", borderRadius: "10px", opacity: "0.7", fontFamily: "Basic" }}
        size="small"
        options={options}
        defaultValue={value}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        slotProps={{
          paper: {
            sx: {
              '& .MuiAutocomplete-listbox': {
                '& .MuiAutocomplete-option': {
                  fontFamily: 'Basic',
                },
              },
            },
          },
        }}
        renderInput={(params) => (
        
          <TextField 
            {...params}
            sx={{ fontFamily: "Basic" }}
            />
        )}
        filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      selectOnFocus
      />
    </div>

  );
}
