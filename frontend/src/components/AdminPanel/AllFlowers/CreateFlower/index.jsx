import { FormHelperText } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import numbro from "numbro";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { secondaryThemeColor } from "../../../../helpers/colors";
import flowers from "../../../../store/flowers";
import MyAmount from "../../../System/FormComponents/MyAmount";
import MySimpleMenu from "../../../System/FormComponents/MySimpleMenu";
import MyTextField from "../../../System/FormComponents/MyTextField";
import UploadArea from "../../../System/UploadArea";
import ZeusButton from "../../../System/ZeusButton";
import { useUploadFile } from "./../../../../hooks/useUploadFile";

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
    minWidth: 500,
    padding: "15px 20px",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
  imageBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: secondaryThemeColor,
  },
});

const CreateProduct = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { file, upload } = useUploadFile();

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      file: null,
      type: "stock",
      description: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      values.price = numbro.unformat(values.price);

      const result = await flowers.createFlower({ ...values, file });

      if (result) {
        history.goBack();
      }

      setLoading(false);
    },
    [file, history]
  );

  return (
    <div className={classes.root}>
      <h1>???????????????? ?????????????????? (????????????) </h1>

      <div className={classes.block}>
        <MyTextField
          control={form?.control}
          name="name"
          label="????????????????"
          autoComplete="off"
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.name?.type === "required" && (
          <FormHelperText error>???????? ????????????????????????</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MySimpleMenu
          control={form?.control}
          name="type"
          label="??????"
          options={[
            { label: "??????????", value: "stock" },
            { label: "??????????", value: "bouquets" },
            { label: "????????????", value: "flowers" },
            { label: "??????????????", value: "gift" },
            { label: "?????????????????? ????????????????????", value: "weddingCompositions" },
          ]}
          rules={{ required: true }}
          fullWidth
        />

        {form?.formState?.errors?.type?.type === "required" && (
          <FormHelperText error>???????? ????????????????????????</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyAmount
          control={form?.control}
          name="price"
          label="????????"
          rules={{ required: true }}
        />

        {form?.formState?.errors?.price?.type === "required" && (
          <FormHelperText error>???????? ????????????????????????</FormHelperText>
        )}

        <div style={{ height: 10 }} />

        <MyTextField
          control={form?.control}
          name="description"
          label="????????????????"
          autoComplete="off"
          fullWidth
          multiline
          rows={8}
        />

        <div style={{ height: 20 }} />

        <div className={classes.imageBlock}>
          <UploadArea
            file={file}
            upload={upload}
            subLabel="?????????????????? ????????????????????"
          />
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton
            style={
              !file || loading
                ? { backgroundColor: grey[200] }
                : { backgroundColor: green[600] }
            }
            onClick={form.handleSubmit(confirm)}
            loading={loading}
            disabled={!file || loading}
          >
            ??????????????
          </ZeusButton>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
