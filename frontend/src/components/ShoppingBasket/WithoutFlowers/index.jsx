import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import ZeusButton from "../../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    padding: "15px 10px",
    borderRadius: "1rem",
    textAlign: "center",
    backgroundColor: "#fbfbf5",
  },
});

const WithoutFlowers = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <p style={{ fontSize: "1.2rem" }}>
          Ваша корзина пока что пуста, чтобы ее пополнить вернитесь в каталог
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ZeusButton component={Link} to="/">
            Вернуться в каталог
          </ZeusButton>
        </div>
      </div>
    </div>
  );
};

export default WithoutFlowers;
