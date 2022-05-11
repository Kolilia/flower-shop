import { makeStyles } from "@material-ui/core/styles";
import React, { memo, useCallback, useRef } from "react";
import { showSize } from "../../helpers/validateFileSize";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { secondaryThemeColor } from "./../../helpers/colors";

const useStyles = makeStyles({
  root: {
    border: `2px dashed ${secondaryThemeColor}`,
    borderRadius: "1em",
    padding: ".5rem",
    cursor: "pointer",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: ({ iconSize }) => ({
    width: iconSize || "3rem",
  }),
  center: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "0 .5rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: ".5rem",
  },
});

const UploadArea = memo(({ upload, subLabel, iconSize, loading, file }) => {
  const classes = useStyles({ iconSize });

  const inputRef = useRef(null);
  const areaRef = useRef(null);

  useDragAndDrop({
    ref: areaRef,
    onChange: (file) => upload(file),
  });

  const onChange = useCallback((e) => upload(e.target?.files?.[0]), [upload]);

  return (
    <>
      <div
        className={classes.root}
        ref={areaRef}
        onClick={() => inputRef.current.click()}
      >
        <div className={classes.center}>
          <div className={classes.image}>
            <img src="/images/file-upload.svg" alt="" />
          </div>{" "}
          {!loading && (
            <div className={classes.content}>
              {file?.name && (
                <b style={{ wordBreak: "break-all" }}>
                  {file?.name} ({showSize(file?.size)})
                </b>
              )}

              <span>Нажмите или перетащите сюда</span>
            </div>
          )}
          {loading && (
            <div className={classes.content}>
              <span>Загрузка</span>
            </div>
          )}
        </div>

        {subLabel}
      </div>

      <input
        ref={inputRef}
        onChange={onChange}
        hidden
        type="file"
        onClick={(e) => (e.target.value = "")}
      />
    </>
  );
});

export default UploadArea;
