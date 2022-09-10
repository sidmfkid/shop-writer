import { axiosInstance } from "./axiosInstance";
import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const useAxiosFetch = (url, method, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: `${method}`,
    url: `${url}`,
    data: data,
  };
  const app = useAppBridge();

  const fetchData = async () => {
    try {
      const token = await getSessionToken(app);
      config.headers["Authorization"] = `Bearer ${token}`;
      const result = await axiosInstance.request(config);

      return result;
    } catch (error) {
      //	console.log('set response fetch error', error);
      console.log(error);
    }
  };
  return fetchData();
};
