import { InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  helperText: {
    fontSize: ".75rem",
  },
  labelDisabled: {
    color: "#444444d9 !important",
  },
  disabled: {
    color: "#282828",
  },
});

const CustomTextField = ({
  value,
  onChange,
  helperText,
  disabled,
  label,
  fullWidth,
  endAdornment,
  rows,
  multiline,
  autoComplete,
  name,
  placeholder,
  variant = "outlined",
}) => {
  const classes = useStyles();

  return (
    <TextField
      value={value}
      name={name}
      variant={variant}
      placeholder={placeholder}
      onChange={(e) => onChange(e, e.target.value)}
      disabled={disabled}
      style={{ fontFamily: "'Roboto Flex', sans-serif" }}
      InputProps={{
        inputProps: {
          autoComplete: autoComplete || "new-password",
        },
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
        classes: {
          disabled: classes.disabled,
        },
      }}
      helperText={helperText}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
      InputLabelProps={{
        shrink: true,
        classes: {
          disabled: classes.labelDisabled,
        },
      }}
      label={label}
      fullWidth={fullWidth}
      rows={rows}
      multiline={multiline}
    />
  );
};

export default CustomTextField;
