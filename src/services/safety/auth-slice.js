import { AUTHORIZATION } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: AUTHORIZATION,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer${token}`);
    }
  },
});

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (credentials) => ({
        url: AUTHORIZATION,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthMutation } = apiAuth;
