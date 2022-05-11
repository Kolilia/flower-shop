import { FormHelperText } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import numbro from "numbro";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import flowers from "../../../../store/flowers";
import Alert from "../../../System/Alert";
import MyAmount from "../../../System/FormComponents/MyAmount";
import MySimpleMenu from "../../../System/FormComponents/MySimpleMenu";
import MyTextField from "../../../System/FormComponents/MyTextField";
import ZeusButton from "../../../System/ZeusButton";

const EditFlower = ({ open, setOpen, refetch, flower }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: flower?.name || "",
      price: flower?.price || "",
      type: flower?.type || "stock",
      description: flower?.description || "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const payload = {};

      const keys = Object?.keys(values);

      keys.forEach((key) => {
        if (key === "price") {
          if (
            values?.[key] !== undefined &&
            numbro.unformat(values?.[key]) !== flower?.[key]
          ) {
            payload[key] = numbro.unformat(values[key]);
          }
        } else {
          payload[key] = values[key];
        }
      });

      const result = await flowers.changeFlower(flower?._id, payload);

      if (result) {
        refetch({});
        setOpen(false);
      }

      setLoading(false);
    },
    [flower, refetch, setOpen]
  );

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      customTitle="Редактирование"
      content={
        <>
          <MyTextField
            control={form?.control}
            name="name"
            label="Название"
            autoComplete="off"
            rules={{ required: true }}
            fullWidth
          />

          {form?.formState?.errors?.name?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 10 }} />

          <MySimpleMenu
            control={form?.control}
            name="type"
            label="Тип"
            options={[
              { label: "Акция", value: "stock" },
              { label: "Букет", value: "bouquets" },
              { label: "Цветок", value: "flowers" },
              { label: "Подарок", value: "gift" },
              { label: "Свадебная композиция", value: "weddingCompositions" },
            ]}
            rules={{ required: true }}
            fullWidth
          />

          {form?.formState?.errors?.type?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 10 }} />

          <MyAmount
            control={form?.control}
            name="price"
            label="Цена"
            rules={{ required: true }}
          />

          {form?.formState?.errors?.price?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 10 }} />

          <MyTextField
            control={form?.control}
            name="description"
            label="Описание"
            autoComplete="off"
            fullWidth
            multiline
            rows={3}
          />

          <div style={{ height: 10 }} />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ZeusButton
              style={
                loading
                  ? { backgroundColor: grey[200] }
                  : { backgroundColor: green[600] }
              }
              onClick={form.handleSubmit(confirm)}
              loading={loading}
              disabled={loading}
            >
              Подтвердить
            </ZeusButton>
          </div>
        </>
      }
    />
  );
};

export default EditFlower;
