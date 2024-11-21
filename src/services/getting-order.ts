import { API_ORDER } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponseDataToOrderDetails } from "../utils/types";

export const apiOrder = createApi({
  reducerPath: "apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ORDER,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendData: builder.mutation<
      IResponseDataToOrderDetails,
      { ingredients: string[] }
    >({
      query: (data) => ({
        url: API_ORDER,
        method: "POST",
        body: data,
      }),
    }),
    getData: builder.query<IResponseDataToOrderDetails, void>({
      query: () => ({
        url: API_ORDER,
        method: "GET",
      }),
    }),
  }),
});

export const { useSendDataMutation } = apiOrder;
