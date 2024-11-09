import { LOGOUT } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: LOGOUT,
});

export const apiLogout = createApi({
  reducerPath: "apiLogout",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: ({ token }) => ({
        url: LOGOUT,
        method: "POST",
        body: {
          token,
        },
      }),
    }),
  }),
});

export const { useLogoutMutation } = apiLogout;
