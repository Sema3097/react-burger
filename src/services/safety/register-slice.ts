import { REGISTER } from "../../utils/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFetchResponse } from "../../utils/types";

interface IRegisterResponse {
  email: string;
  password: string;
  name: string;
}

export const apiRegister = createApi({
  reducerPath: "apiRegister",
  baseQuery: fetchBaseQuery({
    baseUrl: REGISTER,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IFetchResponse, IRegisterResponse>({
      query: (credentials) => ({
        url: REGISTER,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = apiRegister;
