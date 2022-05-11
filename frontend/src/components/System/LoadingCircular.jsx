import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { secondaryThemeColor } from "./../../helpers/colors";

const useStyles = makeStyles({
  buttonProgress: {
    color: secondaryThemeColor,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

const LoadingCircular = ({ loading }) => {
  const classes = useStyles();

  return loading ? (
    <CircularProgress size={24} className={classes.buttonProgress} />
  ) : null;
};

export default LoadingCircular;
