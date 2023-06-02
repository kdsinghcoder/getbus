import * as React from "react";
import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ handleChange, from, lable }) {
    const valueRef = useRef('')
    const [value,setValue]= useState("");

    
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleChange(value,from)}
      options={stops}
      sx={{ width: 300 }}
      renderInput={(params) => (
          <TextField
          {...params}
          label={lable}
          name={lable}
          inputRef={valueRef}
          onChange={setValue(valueRef.current.value)}
        />
      )}
    />
  );
}

const stops = ["Ranchi", "Rourkela", "Tatanagar", "Raipur"];
