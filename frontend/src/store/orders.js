import { store } from "@risingstack/react-easy-state";
import { url_backend } from "../endpoints";
import { get, patch, post, showError } from "./../api/index";

const orders = store({
  async fetchOrdersByAdmin(params = {}) {
    try {
      const { data } = await get(`${url_backend}/v1/admin/orders`, params);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchOrderByAdminCsv(params = {}) {
    try {
      const { data } = await get(
        `${url_backend}/v1/admin/orders/csv`,
        params,
        "blob",
        { Accept: "text/csv; charset=utf-8" }
      );

      const blob = data;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "all_orders.csv";

      link.click();
    } catch (err) {
      console.log(err);
      showError(err);
      return false;
    }
  },

  async createOrder(payload) {
    try {
      const { data } = await post(`${url_backend}/v1/orders`, payload);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async completeOrder(orderId) {
    try {
      await patch(`${url_backend}/v1/admin/orders/${orderId}`);

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchOrderById(orderId) {
    try {
      const { data } = await get(`${url_backend}/v1/orders/${orderId}`);

      return data;
    } catch (err) {
      return false;
    }
  },
});

export default orders;
