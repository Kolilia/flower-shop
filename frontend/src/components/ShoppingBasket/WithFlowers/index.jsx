import { DialogActions, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { is } from "../../../helpers/is";
import orders from "../../../store/orders";
import ui from "../../../store/ui";
import MyTextField from "../../System/FormComponents/MyTextField";
import ZeusButton from "../../System/ZeusButton";
import flowers from "./../../../store/flowers";
import Item from "./components/Item";

const useStyles = makeStyles({
  phonesList: {
    flex: 1,
    maxWidth: 500,
    maxHeight: 400,
    overflowY: "auto",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: "10px 15px",
    marginBottom: "1rem",
    marginRight: 10,
  },
  formAddress: {
    flex: 1,
    maxWidth: 500,
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: "10px 15px",
    marginBottom: "1rem",
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
  block: {
    minWidth: 400,
    padding: "15px 20px",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },

  blockInputs: {
    width: "100%",
    marginBottom: "1rem",
  },
});

const WithFlowers = view(() => {
  const classes = useStyles();
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

  const mapPhones = flowers.inBasket.map((item) => {
    return <Item flower={item} key={item?.id} />;
  });

  const total = flowers.inBasket.reduce((prev, next) => {
    if (is(Object, prev)) {
      return +prev?.price + +next?.price;
    }

    return +prev + +next?.price;
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const mapFlowersIds = flowers.inBasket?.map((item) => item?._id);

      const result = await orders.createOrder({
        ...values,
        flowersIds: mapFlowersIds,
      });

      if (result) {
        history.replace("/");

        ui.openSuccessOrderDialog = result?._id;
      }

      setLoading(false);
    },
    [history]
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={classes.phonesList}>{mapPhones}</div>

        <div className={classes.formAddress}>
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

            <DialogActions>
              <ZeusButton
                loading={loading}
                onClick={form.handleSubmit(confirm)}
              >
                Оформить
              </ZeusButton>
            </DialogActions>
          </div>
        </div>
      </div>

      <div>
        <p className={classes.blockText}>
          Итоговая сумма:{" "}
          <b className={classes.boldText}>
            ₽ {is(Object, total) ? total?.price : total}
          </b>
        </p>
      </div>
    </div>
  );
});

export default WithFlowers;
