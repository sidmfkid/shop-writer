import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";

const axiosInstance = axios.create();
// Intercept all requests on this Axios instance
axiosInstance.interceptors.request.use(async function (config) {
  return getSessionToken(window.app) // requires a Shopify App Bridge instance
    .then((token) => {
      // Append your request headers with an authenticated token
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
});
// Export your Axios instance to use within your app
export { axiosInstance };
