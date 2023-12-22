import React from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

export default function SelectField({
  onChange,
  required,
  label,
  options,
  value,
  title,
  formData,
}) {
  return (
    <div>
      <FormControl fullWidth focused required={required}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={onChange}
          title={title}
          focused
        >
          {options.map((menu, index) => {
            return formData ? (
              <MenuItem value={menu.id} key={index}>
                {menu.name}
              </MenuItem>
            ) : (
              <MenuItem value={menu.value} key={index}>
                {menu.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
