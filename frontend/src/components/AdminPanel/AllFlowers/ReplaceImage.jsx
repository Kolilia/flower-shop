import { DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { secondaryThemeColor } from "../../../helpers/colors";
import flowers from "../../../store/flowers";
import ZeusButton from "../../System/ZeusButton";
import { useUploadFile } from "./../../../hooks/useUploadFile";
import Alert from "./../../System/Alert";
import UploadArea from "./../../System/UploadArea";

const useStyles = makeStyles({
  imageBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: secondaryThemeColor,
  },
});

const ReplaceImage = ({ open, setOpen, flowerId, refetch }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { file, upload } = useUploadFile();

  const replace = useCallback(async () => {
    if (!file || loading) {
      return;
    }

    setLoading(true);

    const result = await flowers.replaceImage(flowerId, file);

    if (result) {
      refetch({});

      setOpen(false);
    }

    setLoading(false);
  }, [file, loading, flowerId, setOpen, refetch]);

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      content={
        <>
          <div className={classes.imageBlock}>
            <h2 className={classes.header}>Загрузите фотографию</h2>

            <UploadArea file={file} upload={upload} />
          </div>

          <DialogActions>
            <ZeusButton onClick={replace} loading={loading} disabled={!file}>
              Заменить
            </ZeusButton>
          </DialogActions>
        </>
      }
      size="sm"
    />
  );
};

export default ReplaceImage;
