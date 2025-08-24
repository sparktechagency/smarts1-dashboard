import { api } from "../api/baseApi";

const transactionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch All Transactions
    getTransactions: builder.query({
      query: () => ({
        url: `/dashboard/transactions${location.search}`, // You can modify this if needed to include query parameters
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // Optional: transform the response if needed
    }),

    // GET: Fetch Specific Transaction by ID
    getTransactionById: builder.query({
      query: (id) => ({
        url: `/dashboard/transactions/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // Optional: transform the response if needed
    }),

    // DELETE: Delete Transaction by ID
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/dashboard/transactions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} = transactionSlice;
