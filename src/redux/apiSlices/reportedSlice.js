import { api } from "../api/baseApi"; 

const reportedSlice = api.injectEndpoints({
  endpoints: (builder) => ({

    // GET: Fetch all reported items
    getReported: builder.query({
      query: () => ({
        url: `/report/Booking${location?.search}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, 
    }),

    // PATCH: Mark report as Banned
    banReported: builder.mutation({
      query: (id) => ({
        url: `/reported/${id}/ban`,
        method: "PATCH",
      }),
    }),

    // PATCH: Ignore a report
    ignoreReported: builder.mutation({
      query: (id) => ({
        url: `/reported/${id}/ignore`,
        method: "PATCH",
      }),
    }),

  }),
});

export const {
  useGetReportedQuery,
  useBanReportedMutation,
  useIgnoreReportedMutation,
} = reportedSlice;
