import { api } from "../api/baseApi"; // Assuming your base API is set up correctly

const bookingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Booking Summary
    getBookingSummary: builder.query({
      query: ({ date, currentPage, searchTerm }) => {
        // Build the query string dynamically
        console.log("page", currentPage)
        return {
          url: `/dashboard/booking-summary?${date ? `date=${date}` : ""}${
            date && searchTerm ? `&` : ""
          }${searchTerm ? `searchTerm=${searchTerm}` : ""}${
            date || searchTerm ? `&` : ""
          }page=${currentPage}`,
          method: "GET",
        };
      },
      transformResponse: (res) => res?.data, // Optional transformation of the response
    }),

    // GET: Booking Summary Count
    getBookingSummaryCount: builder.query({
      query: (date) => {
        return {
          url: `/dashboard/booking-summary-count?date=${date}`,
          method: "GET",
        };
      },
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),
  }),
});

// Export hooks for using in components
export const { useGetBookingSummaryQuery, useGetBookingSummaryCountQuery } =
  bookingSlice;
