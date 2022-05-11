import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  paper: {
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  fontFamily: {
    fontFamily: "'Roboto Flex', sans-serif",
  },
});

const Alert = ({
  ref,
  open,
  setOpen,
  content,
  size = "sm",
  customClose,
  styleContent,
  hideCloseBtn,
  onClose,
  customTitle,
  styleDialog,
}) => {
  const classes = useStyles();

  const close = customClose
    ? customClose
    : () => {
        setOpen(false);
        if (onClose) {
          onClose();
        }
      };

  return (
    <Dialog
      ref={ref}
      classes={{ paper: classes.paper }}
      className={classes.fontFamily}
      style={styleDialog}
      open={open}
      onClick={(e) => e.stopPropagation()}
      onClose={close}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle className={classes.fontFamily}>
        {!hideCloseBtn && (
          <IconButton onClick={close} className={classes.close}>
            <Close />
          </IconButton>
        )}
        {customTitle || null}
      </DialogTitle>
      <DialogContent style={styleContent || {}} className={classes.fontFamily}>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
