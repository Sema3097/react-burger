import { BASE_URL_API } from "../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Iingredient } from "../utils/types";

interface IUseGetFetchQueryResponse {
  data: Iingredient[];
}

export const fetchApi = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_API}ingredients`,
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
