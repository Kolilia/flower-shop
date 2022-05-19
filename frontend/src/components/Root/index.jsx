import {
  DialogActions,
  FormHelperText,
  LinearProgress,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Routes } from "../../routing/Routes";
import SwitchRoutes from "../../routing/SwitchRoutes";
import flowers from "../../store/flowers";
import orders from "../../store/orders";
import ZeusButton from "../System/ZeusButton";
import { mainThemeColor, secondaryThemeColor } from "./../../helpers/colors";
import ui from "./../../store/ui";
import Alert from "./../System/Alert";
import CustomTextField from "./../System/CustomTextField";
import Header from "./Header";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: 0,
      minWidth: 400,
      overflowY: "auto",
      fontFamily: "'Roboto Flex', sans-serif !important",
      backgroundColor: mainThemeColor,
    },
    header: {
      backgroundColor: "#fbfbf5",
      padding: ".7rem 0rem",
      position: "sticky",
      width: "100%",
      top: 0,
      marginBottom: "1rem",
      zIndex: 100,
    },

    path: {
      color: secondaryThemeColor,
    },

    html: {
      margin: 0,
    },
    b: {
      fontWeight: 700,
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    main: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: "100vh",
    },
    img: {
      maxWidth: "100%",
    },
    "#component-error-text": {
      color: "red",
    },
    ".MuiOutlinedInput-input": {
      padding: ".7rem .4rem",
    },
    ".MuiOutlinedInput-root": {
      borderRadius: "1rem",
      fontSize: "1rem",
    },

    ".MuiBadge-colorPrimary": {
      backgroundColor: secondaryThemeColor,
    },
    ".MuiRadio-colorSecondary.Mui-checked": {
      color: secondaryThemeColor,
    },
    ".MuiCheckbox-colorSecondary.Mui-checked": {
      color: secondaryThemeColor,
    },
    ".MuiFormHelperText-root.Mui-error": {
      color: red[600],
      fontWeight: 700,
      fontFamily: "'Roboto Flex', sans-serif",
    },
    "#root": {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: "100vh",
    },
    "#main-content": {
      width: 1400,
      margin: "0 auto",

      "@media (max-width: 1824px)": {
        width: 1200,
      },

      "@media (max-width: 1624px)": {
        width: 1100,
      },

      "@media (max-width: 1424px)": {
        width: 900,
      },

      "@media (max-width: 1024px)": {
        width: 800,
      },

      "@media (max-width: 850px)": {
        width: "95%",
      },
    },
    a: {
      cursor: "pointer",
      fontWeight: 600,
      transition: "all .2s ease",
      textDecoration: "none",
      letterSpacing: "0.04em",
      color: secondaryThemeColor,
    },
  },
});

const SyncShoppingBasket = view(() => {
  const { inBasket } = flowers;

  useEffect(() => {
    const getKey = localStorage.getItem("basketProductsFlowers");

    if (getKey) {
      flowers.inBasket = JSON.parse(getKey);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(inBasket);

    localStorage.setItem("basketProductsFlowers", json);
  }, [inBasket]);

  return null;
});

const GlobalSuccessOrder = view(() => {
  const customClose = () => {
    flowers.inBasket = [];
    ui.openSuccessOrderDialog = undefined;
  };

  return (
    <Alert
      open={ui.openSuccessOrderDialog}
      customClose={customClose}
      content={
        <>
          <p>
            Ваш заказ принят и обрабатывается. Сохраните себе номер заказа{" "}
            {ui.openSuccessOrderDialog}
          </p>

          <DialogActions>
            <ZeusButton onClick={customClose}>Окей</ZeusButton>
          </DialogActions>
        </>
      }
      customTitle="Заказ успешно оформлен"
      size="xs"
      hideCloseBtn
    />
  );
});

const GlobalCheckOrder = view(() => {
  const { openCheckOrder } = ui;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [orderId, setOrderId] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);

  const find = useCallback(async () => {
    setLoading(true);

    const result = await orders.fetchOrderById(orderId?.trim());

    if (result) {
      setData(result);
      setStep(2);
    } else {
      setError(true);
    }

    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (!openCheckOrder) {
      setError(false);
      setStep(1);
      setOrderId("");
      setData();
    }
  }, [openCheckOrder]);

  return (
    <Alert
      open={ui.openCheckOrder}
      customClose={() => (ui.openCheckOrder = false)}
      content={
        <>
          {step === 1 && (
            <>
              <CustomTextField
                value={orderId}
                placeholder="Введите сохраненный вами номер заказа"
                onChange={(e, value) => {
                  setError(false);
                  setOrderId(value);
                }}
                fullWidth
              />

              {error && (
                <FormHelperText error>
                  Заказ с таким Идентификатором не найден
                </FormHelperText>
              )}

              <DialogActions>
                <ZeusButton disabled={loading || !orderId} onClick={find}>
                  Окей
                </ZeusButton>
              </DialogActions>
            </>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ marginBottom: 10 }}>
                Найден заказ с таким Идентификатором
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  marginBottom: 15,
                }}
              >
                <b>Цветы</b>
                <span>{data?.flowers}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  marginBottom: 15,
                }}
              >
                <b>Адрес</b>
                <span>{data?.address}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  marginBottom: 15,
                }}
              >
                <b>Город</b>
                <span>{data?.city}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  marginBottom: 15,
                }}
              >
                <b>Почтовый индекс</b>
                <span>{data?.postalCode}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  marginBottom: 15,
                }}
              >
                <b>Статус</b>
                <span>{data?.execute}</span>
              </div>
            </div>
          )}
        </>
      }
      customTitle="Найти заказ"
    />
  );
});

const Error = view(() => {
  return (
    <Alert
      open={Boolean(ui.error)}
      customClose={() => (ui.error = undefined)}
      customTitle={ui.error?.message}
      content={
        <>
          <p>{ui?.error?.description}</p>

          <DialogActions>
            <ZeusButton onClick={() => (ui.error = undefined)}>Окей</ZeusButton>
          </DialogActions>
        </>
      }
      size="xs"
    />
  );
});

const Root = view(() => {
  useStyles();

  return (
    <>
      <Error />

      <Header />

      <SyncShoppingBasket />

      <GlobalSuccessOrder />

      <GlobalCheckOrder />

      <main id="main-content">
        <Suspense fallback={<LinearProgress />}>
          <SwitchRoutes routes={Routes} />
        </Suspense>
      </main>
    </>
  );
});

export default Root;
