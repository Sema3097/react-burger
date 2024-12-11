import { BASE_URL_API } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFetchResponse } from "../../utils/types";

interface ISendDataToServer {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL_API}auth/login`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer${token}`);
    }
    return headers;
  },
});

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    auth: builder.mutation<IFetchResponse, ISendDataToServer>({
      query: (credentials) => ({
        url: `${BASE_URL_API}auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthMutation } = apiAuth;
