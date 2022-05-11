import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const Logo = view(() => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <Link
        to={location.pathname?.includes("admin") ? "/admin/all-orders" : "/"}
      >
        <img src="/images/logotip.png" alt="logo" className={classes.image} />
      </Link>
    </div>
  );
});

export default Logo;
