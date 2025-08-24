import { api } from "../api/baseApi";

const customerSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch All Customers
    getCustomers: builder.query({
      query: () => ({
        url: `/dashboard/customers${location.search}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // GET: Fetch Banned Customers
    getBannedCustomers: builder.query({
      query: () => ({
        url: "/dashboard/customers/banned",
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // DELETE: Delete Customer by ID
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/dashboard/customers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetBannedCustomersQuery,
  useDeleteCustomerMutation,
} = customerSlice;
