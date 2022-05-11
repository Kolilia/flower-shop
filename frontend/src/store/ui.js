import { store } from "@risingstack/react-easy-state";

const ui = store({
  openSuccessOrderDialog: undefined,
  openCheckOrder: false,
  error: undefined,
});

export default ui;
