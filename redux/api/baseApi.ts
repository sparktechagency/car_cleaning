import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    // console.log(token, "token from base url............");

    const result: AxiosResponse = await axios({
      // ----------- live base url ------------------
      baseURL: "https://fullcircledetailing.com/api",

      //  local base url ---------- ------------
      // baseURL: "http://103.186.20.114:8099/api",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // console.log(result.data);
    // Check if response data is a string and malformed
    if (result?.status === 403) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }

    if (result?.status === 401) {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    }
    if (typeof result?.data === "string") {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += "}");
      return { data: JSON.parse(withCurly) };
      // }
    }
    if (typeof result?.data === "object") {
      return { data: result?.data };
    }

    return { data: result?.data };
  } catch (error: any) {
    if (error.response?.data) {
      if (typeof error.response?.data === "string") {
        const withCurly = (error.response.data += "}");

        return { error: JSON.parse(withCurly) };
      } else {
        return { error: error.response?.data };
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || "Something went wrong",
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  keepUnusedDataFor: 0,
  reducerPath: "api",
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: ["home", "vehicle", "service", "user", "booking", "photo"],
});

// export const imageUrl = 'http://192.168.12.160:7000/';
export const imageUrl = "https://fullcircledetailing.com/";
