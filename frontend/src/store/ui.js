import { store } from "@risingstack/react-easy-state";

const ui = store({
  openSuccessOrderDialog: false,
  error: undefined,
});

export default ui;
