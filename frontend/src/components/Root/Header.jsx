import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ShoppingBasket } from "@material-ui/icons";
import { view } from "@risingstack/react-easy-state";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../helpers/colors";
import flowers from "../../store/flowers";
import ui from "../../store/ui";
import Logo from "../System/Logo";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "0 .8rem",
    cursor: "pointer",
    flex: 0.7,
    color: secondaryThemeColor,
  },
});

const Header = view(() => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <header>
      <div id="main-content">
        <div className={classes.root}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <Logo />
          </div>

          {!location?.pathname?.includes("admin") && (
            <div
              className={classes.icon}
              onClick={() => history.push("/basket")}
            >
              {flowers?.inBasket?.length > 0 ? (
                <Badge color="primary" badgeContent={flowers?.inBasket?.length}>
                  <ShoppingBasket
                    fontSize="large"
                    style={{ marginRight: ".1rem" }}
                  />
                </Badge>
              ) : (
                <ShoppingBasket
                  fontSize="large"
                  style={{ marginRight: ".1rem" }}
                />
              )}
              Корзина
            </div>
          )}

          {!location?.pathname?.includes("admin") && (
            <div>
              <a onClick={() => (ui.openCheckOrder = true)}>Найти заказ</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
