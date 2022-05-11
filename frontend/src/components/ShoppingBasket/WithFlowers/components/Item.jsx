import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { secondaryThemeColor } from "../../../../helpers/colors";
import flowers from "./../../../../store/flowers";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: "1rem",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: "auto",
  },
  nameBlock: {
    marginLeft: "1rem",
    wordBreak: "break-word",
    maxWidth: 750,
    width: "100%",
  },

  priceBlock: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  price: {
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  icon: {
    color: secondaryThemeColor,
    fontSize: "2rem",
    marginLeft: "1rem",
    cursor: "pointer",
  },
});

const Item = view(({ flower }) => {
  const classes = useStyles();

  const deleteItem = () => {
    flowers.inBasket = flowers.inBasket.filter((item) => {
      return item?._id !== flower?._id;
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <img src={flower?.imageHref} alt="" className={classes.image} />
      </div>
      <div className={classes.nameBlock}>
        <p>{flower?.name}</p>
      </div>

      <div className={classes.priceBlock}>
        <div>
          <p className={classes.price}>
            <b>{`₽ ${flower?.price}`}</b>
          </p>
        </div>

        <div>
          <Delete onClick={deleteItem} className={classes.icon} />
        </div>
      </div>

      <Divider />
    </div>
  );
});

export default Item;
