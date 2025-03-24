import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainUrl } from "utils/mainUrl";

export const categoriesSlice = createApi({
  reducerPath: "categoriesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "category",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (inputs) => ({
        url: "category",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: (inputs) => ({
        url: `/category/${inputs.id}`,
        method: "PUT",
        body: inputs,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesSlice;
