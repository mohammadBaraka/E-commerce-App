import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainUrl } from "utils/mainUrl";
export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => "token",
      providesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (inputs) => ({
        url: "register",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (inputs) => ({
        url: "login",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authSlice;
