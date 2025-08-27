import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => {
        return {
          url: "/service-category",
          method: "POST",
          body: categoryData,
        };
      },
    }),
    getServiceCategory: builder.query({
      query: () => ({
        // url: `/coupon/admin?searchTerm=${searchTerm || ''}&page=${page}&limit=${limit}`,
        url: `/service-category`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),

    getServiceCategoryById: builder.query({
      query: (id) => ({
        // url: `/coupon/admin?searchTerm=${searchTerm || ''}&page=${page}&limit=${limit}`,
        url: `/service-category/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),
    updateCategory: builder.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: updatedData,        
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/service-category/${id}`,
          method: "DELETE",          
        };
      },
    }),
    category: builder.query({
      query: () => {
        return {
          url: "/category/get-category",
          method: "GET",          
        };
      },
    }),
  }),
});

export const {
  useCategoryQuery,
  useGetServiceCategoryQuery,
useGetServiceCategoryByIdQuery,

  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
