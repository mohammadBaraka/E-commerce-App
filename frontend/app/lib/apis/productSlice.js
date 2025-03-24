import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainUrl } from "utils/mainUrl";
export const productSlice = createApi({
  reducerPath: "productSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ limit, page, categories }) => ({
        url: `product?limit=${limit}&page=${page}&&categories=${
          categories ? categories : ""
        }`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getProductByCategory: builder.mutation({
      query: ({ limit, page, categories }) => ({
        url: `product?limit=${limit}&page=${page}&categories=${categories}`,
        method: "GET",
      }),
      invalidatesTags: ["products"],
    }),

    getProductById: builder.query({
      query: (id) => `product/${id}`,
    }),

    createProduct: builder.mutation({
      query: (inputs) => ({
        url: "product",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),

    searchProduct: builder.query({
      query: (search) => ({
        url: `product/search?name=${search}`,
        method: "get",
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    gallery: builder.mutation({
      query: ({ id, images }) => ({
        url: `product/gallery/${id}`,
        method: "PUT",
        body: images,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});
export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByCategoryMutation,
  useGetProductByIdQuery,
  useGalleryMutation,
  useSearchProductQuery,
} = productSlice;
