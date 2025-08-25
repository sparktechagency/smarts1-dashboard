import { api } from "../api/baseApi"; // Assuming your base API is set up correctly

const couponSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch All Categories
   

    // GET: Fetch All Coupons
    getCoupons: builder.query({
      query: () => ({
        // url: `/coupon/admin?searchTerm=${searchTerm || ''}&page=${page}&limit=${limit}`,
        url: `/coupon/admin${location?.search}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),

    // GET: Fetch Coupon by ID
    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupon/admin/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),

    // POST: Create a new Coupon
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon/create",
        method: "POST",
        body: couponData,
      }),
    }),

    // PUT: Update a Coupon
    updateCoupon: builder.mutation({
      query: (data ) => {
        console.log("updatre", data);
        
        return {
        url: `/coupon/update/${data?.code}`,
        method: "PATCH",
        body: data,
      }
      },
    }),

    // DELETE: Delete Coupon by ID
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for using in components
export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,

  useCreateCouponMutation,
  
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponSlice;
