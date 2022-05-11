import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { secondaryThemeColor } from "../../helpers/colors";
import LoadingCircular from "./LoadingCircular";

const useStyles = makeStyles({
  root: {
    backgroundColor: secondaryThemeColor,
    borderRadius: "1rem",
    color: "#f2f3f4",
    height: "auto",
    fontFamily: "'Roboto Flex', sans-serif",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#75bbfd",
      color: "#050305",
    },
  },
});

const ZeusButton = ({
  children,
  style = {},
  onClick,
  loading,
  disabled,
  fullWidth,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant="contained"
      className={classes.root}
      onClick={onClick}
      style={style}
      fullWidth={fullWidth}
      disabled={loading || disabled}
    >
      {children}
      <LoadingCircular loading={loading} />
    </Button>
  );
};

export default ZeusButton;
