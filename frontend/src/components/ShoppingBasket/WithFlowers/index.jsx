import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { Link } from "react-router-dom";
import { is } from "../../../helpers/is";
import ZeusButton from "../../System/ZeusButton";
import flowers from "./../../../store/flowers";
import Item from "./components/Item";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  phonesList: {
    flex: 1,
    minWidth: 600,
  },
  total: {
    minWidth: 250,
    marginLeft: "1rem",
    padding: "10px 15px",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    height: "min-content",
    minHeight: 150,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  boldText: {
    marginLeft: ".8rem",
    fontSize: "1.2rem",
  },
  blockText: {
    whiteSpace: "nowrap",
  },
  btnBlock: {
    display: "flex",
    justifyContent: "center",
    marginTop: 14,
  },
});

const WithFlowers = view(() => {
  const classes = useStyles();

  const mapPhones = flowers.inBasket.map((item) => {
    return <Item flower={item} key={item?.id} />;
  });

  const total = flowers.inBasket.reduce((prev, next) => {
    if (is(Object, prev)) {
      return +prev?.price + +next?.price;
    }

    return +prev + +next?.price;
  });

  return (
    <div className={classes.root}>
      <div className={classes.phonesList}>{mapPhones}</div>
      <div className={classes.total}>
        <div>
          <p className={classes.blockText}>
            Количество товара:{" "}
            <b className={classes.boldText}>{flowers.inBasket.length} шт.</b>
          </p>

          <Divider />

          <p className={classes.blockText}>
            Итоговая сумма:{" "}
            <b className={classes.boldText}>
              ₽ {is(Object, total) ? total?.price : total}
            </b>
          </p>

          <Divider />

          <div className={classes.btnBlock}>
            <ZeusButton component={Link} to="/client/checkout">
              Оформить заказ
            </ZeusButton>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WithFlowers;
