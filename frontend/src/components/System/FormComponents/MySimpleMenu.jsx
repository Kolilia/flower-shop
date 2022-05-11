import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useController } from "react-hook-form";

const MySimpleMenu = ({
  control,
  name,
  rules,
  disabled,
  label,
  fullWidth,
  options,
  renderOption,
}) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const mapOptions = options.map((item) => (
    <MenuItem
      key={item.value}
      value={item.value}
      id={item?.id}
      style={{
        fontFamily: "'Roboto Flex', sans-serif",
      }}
    >
      {renderOption ? renderOption(item) : item.label}
    </MenuItem>
  ));

  return (
    <TextField
      {...field}
      InputLabelProps={{
        shrink: true,
      }}
      label={label}
      disabled={disabled}
      fullWidth={fullWidth}
      style={{
        fontFamily: "'Roboto Flex', sans-serif",
      }}
      select
      required={rules?.required ? true : false}
    >
      {mapOptions}
    </TextField>
  );
};

export default MySimpleMenu;
