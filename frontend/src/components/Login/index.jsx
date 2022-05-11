import { FormHelperText, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { secondaryThemeColor } from "../../helpers/colors";
import MyTextField from "../System/FormComponents/MyTextField";
import ZeusButton from "../System/ZeusButton";
import ui from "./../../store/ui";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  block: {
    padding: 20,
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    maxWidth: 400,
    width: "100%",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  link: {
    color: secondaryThemeColor,
    marginTop: ".6rem",
  },
  blockInputs: {
    width: "100%",
    marginBottom: "1rem",
  },
});

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const confirm = useCallback(
    async (values) => {
      setLoading(true);

      const result = values.email === "admin" && values.password === "admin";

      if (result) {
        history.replace("/admin/all-orders");
        sessionStorage.setItem("adminFlowerShopLogin", 1);
      } else {
        ui.error = {
          message: "Неправильный логин или пароль",
        };
      }

      setLoading(false);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <h1>Авторизация в панель админа</h1>

      <div className={classes.block}>
        <div className={classes.blockInputs}>
          <MyTextField
            control={form.control}
            name="email"
            label="Почта"
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.email?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}

          <div style={{ height: 15 }} />

          <MyTextField
            control={form.control}
            name="password"
            type={showPassword ? "text" : "password"}
            label="Пароль"
            endAdornment={
              <>
                {showPassword ? (
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setShowPassword(false)}
                  >
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setShowPassword(true)}
                  >
                    <Visibility />
                  </IconButton>
                )}
              </>
            }
            rules={{ required: true }}
            fullWidth
          />

          {form.formState.errors?.password?.type === "required" && (
            <FormHelperText error>Поле обязательное</FormHelperText>
          )}
        </div>

        <div className={classes.actions}>
          <ZeusButton onClick={form.handleSubmit(confirm)} loading={loading}>
            Войти
          </ZeusButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
