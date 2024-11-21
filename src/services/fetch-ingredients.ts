import { API_INGREDIENTS } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Iingredient } from "../utils/types";

interface IUseGetFetchQueryResponse {
  data: Iingredient[];
}

export const fetchApi = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: API_INGREDIENTS,
  }),
  endpoints: (builder) => ({
    getFetch: builder.query<Iingredient[], string | undefined>({
      query: (query = "") => ({
        url: query,
      }),
      transformResponse: (response: IUseGetFetchQueryResponse) => response.data,
    }),
  }),
});

export const { useGetFetchQuery } = fetchApi;
