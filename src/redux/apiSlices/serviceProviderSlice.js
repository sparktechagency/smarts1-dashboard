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

    // GET: Fetch Banned Service Providers (optional if you want a specific list)
    getBannedServiceProviders: builder.query({
      query: () => ({
        url: "/dashboard/service-providers/banned", // Adjust this if there's a specific endpoint for banned providers
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // DELETE: Delete Service Provider by ID
    deleteServiceProvider: builder.mutation({
      query: (id) => ({
        url: `/dashboard/service-providers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceProvidersQuery,
  useGetBannedServiceProvidersQuery,
  useDeleteServiceProviderMutation,
} = serviceProvidersSlice;
