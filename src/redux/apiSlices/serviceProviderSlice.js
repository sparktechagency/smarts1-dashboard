import { api } from "../api/baseApi";

const serviceProvidersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch All Service Providers
    getServiceProviders: builder.query({
      query: () => ({
        url: `/dashboard/service-providers${location.search}`, // Adds any query params (if any) from location.search
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // GET: Fetch Banned Customers
    bannedProviders: builder.mutation({
      query: ({id, status}) => ({
        url: `users/admin/toggle-block/${id}?tobeStatus=${status}`,
        // url: `users/admin/toggle-block/${id}}`,
        method: "PATCH",
      }),
      transformResponse: (res) => res?.data, // optional
    }),
    // DELETE: Delete Service Provider by ID
    deleteServiceProvider: builder.mutation({
      query: (id) => ({
        // url: `/dashboard/service-providers/${id}`,
        url: `/users/admin/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceProvidersQuery,
  useBannedProvidersMutation,

  useDeleteServiceProviderMutation,
} = serviceProvidersSlice;
