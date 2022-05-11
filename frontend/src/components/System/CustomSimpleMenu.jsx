import { MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto Flex', sans-serif",
  },
});

const CustomSimpleMenu = ({
  value,
  onChange,
  disabled,
  label,
  fullWidth,
  options,
  style = {},
  name,
}) => {
  const classes = useStyles();

  const mapOptions = (options || []).map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  return (
    <TextField
      name={name}
      value={value}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.root,
          disabled: classes.labelDisabled,
        },
      }}
      style={{
        fontFamily: "'Roboto Flex', sans-serif",
        ...style,
      }}
      onChange={(e) => onChange(e, e.target.value)}
      label={label}
      disabled={disabled}
      fullWidth={fullWidth}
      select
    >
      {mapOptions}
    </TextField>
  );
};

export default CustomSimpleMenu;
