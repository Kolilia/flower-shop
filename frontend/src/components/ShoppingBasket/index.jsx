import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import flowers from "./../../store/flowers";
import WithFlowers from "./WithFlowers";
import WithoutFlowers from "./WithoutFlowers";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ShoppingBasket = view(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Корзина</h1>

      {flowers?.inBasket?.length > 0 ? <WithFlowers /> : <WithoutFlowers />}
    </div>
  );
});

export default ShoppingBasket;
