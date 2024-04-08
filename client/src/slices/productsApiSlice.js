import { PRODUCTS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/featured-products`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getRelatedProducts: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/related-products/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetFeaturedProductsQuery,
  useGetRelatedProductsQuery
} = usersApiSlice;
