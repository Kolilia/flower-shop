import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import flowers from "../../store/flowers";
import ui from "../../store/ui";
import MyTextField from "../System/FormComponents/MyTextField";
import ZeusButton from "../System/ZeusButton";
import orders from "./../../store/orders";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },

  block: {
    minWidth: 400,
    padding: "15px 20px",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  blockInputs: {
    width: "100%",
    marginBottom: "1rem",
  },
});

const Checkout = view(() => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const classes = useStyles();

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const mapProductsIds = flowers.inBasket?.map((item) => item?._id);

      const result = await orders.createOrder({
        ...values,
        flowersIds: mapProductsIds,
      });

      if (result) {
        history.replace("/");

        ui.openSuccessOrderDialog = true;
      }

      setLoading(false);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <h1>Оформление доставки товаров ({flowers.inBasket.length})</h1>
      <div className={classes.block}>
        <div className={classes.blockInputs}>
          <MyTextField
            control={form.control}
            name="address"
            label="Адрес"
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.address?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 15 }} />

          <MyTextField
            control={form.control}
            name="city"
            label="Город"
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.city?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 15 }} />

          <MyTextField
            control={form.control}
            name="postalCode"
            label="Почтовый  индекс"
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.postalCode?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}
        </div>

        <div className={classes.actions}>
          <ZeusButton loading={loading} onClick={form.handleSubmit(confirm)}>
            Оформить
          </ZeusButton>
        </div>
      </div>
    </div>
  );
});

export default Checkout;
