import axios from "axios";
import store from "store";
import { load } from "../store/actions/ui";

export const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  },
  transformRequest: (data, headers) => {
    const state = store.getState();
    if (state.auth.token) {
      headers.common["Authorization"] = `Bearer ${state.auth.token}`;
    }
    return data;
  }
});

request.interceptors.request.use(x => {
  store.dispatch(load(1) as any);
  return x;
});

request.interceptors.response.use(
  x => {
    store.dispatch(load(-1) as any);
    return x;
  },
  x => {
    store.dispatch(load(-1) as any);
    return Promise.reject(x);
  }
);
