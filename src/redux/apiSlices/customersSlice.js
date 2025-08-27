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
    bannedCustomers: builder.mutation({
      query: ({id, status}) => ({
        url: `users/admin/toggle-block/${id}?tobeStatus=${status}`,
        // url: `users/admin/toggle-block/${id}}`,
        method: "PATCH",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // DELETE: Delete Customer by ID
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/users/admin/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useBannedCustomersMutation,
  useDeleteCustomerMutation,
} = customerSlice;
