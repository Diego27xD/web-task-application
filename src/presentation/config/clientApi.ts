import axios from "axios";
import { URL_BASE } from "./config";
import { SecureCookieStorageAdapter } from "../../util/secure-store";

export const apiClient = axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = SecureCookieStorageAdapter.getItem("STR");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});
