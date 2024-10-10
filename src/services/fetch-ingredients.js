import { API_INGREDIENTS } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchApi = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: API_INGREDIENTS,
  }),
  endpoints: (builder) => ({
    getFetch: builder.query({
      query: (query = "") => ({
        url: query,
      }),
      transformResponse: (response) => ({
        ingredients: response.data,
      }),
    }),
  }),
});

export const { useGetFetchQuery } = fetchApi;
