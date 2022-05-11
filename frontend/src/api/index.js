import axios from "axios";
import { Buffer } from "buffer";
import { is } from "./../helpers/is";
import ui from "./../store/ui";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const headers = () => {
  const token = localStorage.getItem("zeusShopToken");

  let Authorization = null;

  if (token) {
    Authorization = `Bearer ${token}`;
  }

  return Authorization ? { authorization: Authorization } : null;
};

export const get = (url, params, responseType, customHeaders = {}) => {
  const authHeaders = headers() || {};

  if (!customHeaders["Accept"]) {
    customHeaders["Accept"] = "application/json";
  }

  return axios.get(url, {
    headers: { ...authHeaders, ...customHeaders },
    params,
    responseType: responseType || null,
    data: {},
  });
};

export const post = (
  url,
  payload,
  customHeaders = { Accept: undefined },
  responseType = null
) => {
  const authHeaders = headers() || {};

  if (!customHeaders["Accept"]) {
    customHeaders["Accept"] = "application/json";
  }

  return axios.post(url, payload, {
    headers: { ...authHeaders, ...customHeaders },
    responseType,
  });
};

export const put = (url, payload) =>
  axios.put(url, payload, { headers: headers() });

export const patch = (url, payload) =>
  axios.patch(url, payload, { headers: headers() });

export const del = (url, payload) =>
  axios.delete(url, { headers: headers(), data: payload });

export const showError = (err) => {
  const data = err?.response?.data;

  if (is(ArrayBuffer, data)) {
    const res = {
      description: Buffer.from(err.response.data).toString("utf8"),
    };

    ui.error = res;
  } else if (data) {
    ui.error = data;
  }
};
