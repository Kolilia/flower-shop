import { LinearProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Suspense, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { secondaryThemeColor } from "../../helpers/colors";
import SwitchRoutes from "./../../routing/SwitchRoutes";

const useStyles = makeStyles({
  root: {
    padding: "10px 15px",
    borderRadius: "1rem",
    fontFamily: "'Roboto Flex', sans-serif",
    backgroundColor: secondaryThemeColor,
  },
  indicator: {
    backgroundColor: secondaryThemeColor,
  },
});

const Admin = ({ routes }) => {
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();

  const [value, setValue] = useState(location.pathname + location.search);

  const valuePathname = value?.split("?")?.[0];

  const finder = location.pathname === valuePathname ? value : false;

  useEffect(() => {
    const key = sessionStorage.getItem("adminFlowerShopLogin");

    if (!key) {
      history.replace("/login");
    }
  }, [history]);

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        className={classes.root}
        value={finder}
        classes={{
          indicator: classes.indicator,
        }}
        onChange={(event, value) => {
          history.push(value);
          setValue(value);
        }}
      >
        <Tab
          label="Заказы"
          value="/admin/all-orders"
          style={{
            color: finder === "/admin/all-orders" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Цветы"
          value="/admin/all-flowers"
          style={{
            color: finder === "/admin/all-flowers" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
      </Tabs>

      <Suspense fallback={<LinearProgress />}>
        <SwitchRoutes routes={routes} />
      </Suspense>
    </>
  );
};

export default Admin;
