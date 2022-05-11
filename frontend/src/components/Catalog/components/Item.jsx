import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { useHistory } from "react-router-dom";
import flowers from "../../../store/flowers";
import { secondaryThemeColor } from "./../../../helpers/colors";
import ZeusButton from "./../../System/ZeusButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: "10px 15px",
    marginBottom: "1rem",
    alignItems: "center",
  },
  gridMode: {
    display: "flex",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: 5,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    border: `2px solid ${secondaryThemeColor}`,
  },
  image: {
    width: 200,
    height: "auto",
  },
  nameBlock: {
    marginLeft: "1rem",
    wordBreak: "break-word",
    maxWidth: 750,
    width: "100%",
  },
  nameBlockGrid: {
    wordBreak: "break-word",
    maxWidth: 300,
    width: "100%",
  },
  priceBlock: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  priceBlockGrid: {
    display: "flex",
  },
  price: {
    textAlign: "center",
  },
  priceGrid: {
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
});

const Item = view(({ flower }) => {
  const classes = useStyles();
  const history = useHistory();

  const inInsideBasket = flowers.inBasket.some(
    (item) => item?._id === flower?._id
  );

  return (
    <div className={classes.gridMode}>
      <div>
        <img src={flower?.imageHref} alt="" className={classes.image} />
      </div>

      <p style={{ margin: 3, fontSize: "1rem" }}>
        <b>{flower?.name}</b>
      </p>

      <div className={classes.priceBlockGrid}>
        <p className={classes.priceGrid}>{`₽ ${flower?.price}`}</p>
      </div>

      <div style={{ marginTop: 5, width: "100%" }}>
        <ZeusButton
          style={{
            whiteSpace: "nowrap",
            padding: 1,
            height: "auto",
          }}
          onClick={() => {
            if (!inInsideBasket) {
              flowers.inBasket = [...flowers.inBasket, flower];
            } else {
              history.push("/basket");
            }
          }}
          fullWidth
        >
          {inInsideBasket ? "В корзине" : "Купить"}{" "}
        </ZeusButton>
      </div>
    </div>
  );
});

export default Item;
