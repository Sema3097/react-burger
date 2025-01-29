import { BASE_URL_API } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponseDataToOrderDetails } from "../utils/types";

export const apiOrder = createApi({
  reducerPath: "apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_API}orders`,
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
        url: `${BASE_URL_API}orders`,
        method: "POST",
        body: data,
      }),
    }),
    getData: builder.query<IResponseDataToOrderDetails, void>({
      query: () => ({
        url: `${BASE_URL_API}orders`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSendDataMutation } = apiOrder;
