import { api } from "../api/baseApi";

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => {
        return {
          url: "/service",
          method: "POST",
          body: data,
        };
      },
    }),

    getService: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // Optional transformation of the response
    }),

    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // Optional transformation of the response
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => {

        console.log("update", data);
        
        return {
          url: `/service/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/${id}`,
          method: "DELETE",
        };
      },
    }),

    // If you want to get a list of all services (similar to `category`)
    service: builder.query({
      query: () => ({
        url: "/service/get-service",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetServiceQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useServiceQuery,
} = serviceSlice;
