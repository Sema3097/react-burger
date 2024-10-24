import { REGISTER } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRegister = createApi({
  reducerPath: "apiRegister",
  baseQuery: fetchBaseQuery({ 
    baseUrl: REGISTER 
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: REGISTER,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = apiRegister;
