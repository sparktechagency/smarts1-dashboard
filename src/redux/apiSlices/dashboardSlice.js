import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Dashboard Summary
    getDashboardSummary: builder.query({
      query: () => ({
        url: "/dashboard/summary",
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional
    }),

    // GET: Monthly Users (year wise)
    getMonthlyUsers: builder.query({
      query: (year) => ({
        url: `/dashboard/monthly-users?year=${year}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
    }),

    // GET: Revenue Analytics
    getRevenueAnalytics: builder.query({
      query: (year) => ({
        url: `/dashboard/revenue-analytics?year=${year}`,        
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetMonthlyUsersQuery,
  useGetRevenueAnalyticsQuery,
} = dashboardSlice;
