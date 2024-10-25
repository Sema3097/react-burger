import { LOGOUT } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const handOverToken = () => localStorage.getItem("refreshToken");

const baseQuery = fetchBaseQuery({
  baseUrl: LOGOUT,
});

export const apiLogout = createApi({
  reducerPath: "apiLogout",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => {
        const refreshToken = handOverToken();
        return {
          url: LOGOUT,
          method: "POST",
          body: {
            token: refreshToken,
          },
        };
      },
    }),
  }),
});

export const { useLogoutMutation } = apiLogout;
