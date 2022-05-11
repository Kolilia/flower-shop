import { store } from "@risingstack/react-easy-state";
import { get, patch, post, showError } from "../api/index";
import { url_backend } from "../endpoints";

const flowers = store({
  loading: false,
  items: [],
  inBasket: [],
  pages: 1,
  params: {
    page: 1,
    perPage: 9,
    sortBy: "price",
    sortDirection: "asc",
    search: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    type: "stock",
  },

  clearFilters() {
    flowers.params = {
      page: 1,
      perPage: 10,
      sortBy: "price",
      sortDirection: "asc",
      search: undefined,
      fromPrice: undefined,
      toPrice: undefined,
      type: undefined,
    };
  },

  async createFlower(payload) {
    try {
      const formData = new FormData();

      const keys = Object.keys(payload);

      keys?.forEach((key) => {
        formData.append(key, payload[key]);
      });

      await post(`${url_backend}/v1/admin/flowers`, formData, {
        "Content-Type": "multipart/form-data",
        Accept: true,
      });

      return true;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchFlowersByAdmin(params = {}) {
    try {
      const { data } = await get(`${url_backend}/v1/admin/flowers`, params);

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async replaceImage(flowerId, file) {
    try {
      const formData = new FormData();

      formData.append("image", file);

      const { data } = await post(
        `${url_backend}/v1/admin/flowers/replace-image/${flowerId}`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Accept: true,
        }
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async changeFlower(flowerId, payload) {
    try {
      const { data } = await patch(
        `${url_backend}/v1/admin/flowers/${flowerId}`,
        payload
      );

      return data;
    } catch (err) {
      showError(err);
      return false;
    }
  },

  async fetchFlowers(params = {}) {
    try {
      flowers.loading = true;

      const { data } = await get(`${url_backend}/v1/flowers`, params);

      if (data && data?.data) {
        flowers.items = data?.data;
        flowers.pages = data?.pages;
      }

      flowers.loading = false;

      return data;
    } catch (err) {
      showError(err);

      flowers.loading = false;
      return false;
    }
  },
});

export default flowers;
