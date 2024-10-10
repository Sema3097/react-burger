import { API_ORDER } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiOrder = createApi({
  reducerPath: "apiOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ORDER,
  }),
  endpoints: (builder) => ({
    sendData: builder.mutation({
      query: (data) => ({
        url: API_ORDER,
        method: "POST",
        body: data,
      }),
    }),
    getData: builder.query({
      query: () => ({
        url: API_ORDER,
        method: "GET",
      }),
    }),
  }),
});

export const { useSendDataMutation } = apiOrder;
