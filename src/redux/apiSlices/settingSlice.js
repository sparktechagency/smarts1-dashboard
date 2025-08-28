// /settings/contact-info

import { api } from "../api/baseApi";

const settingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `users/profile`,
    }),

    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: `users/profile`,
        method: "PATCH",
        body: data, // ✅ must send the formData here
      }),
    }),
    getAllAdmin: builder.query({
      query: () => `/users/get-all`,
      transformResponse: (res) => res?.data,
    }),

    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/users/admin`,
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => res?.data,
    }),
    updateImage: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/image/${id}`,
          method: "PATCH",
          body: formData, // ✅ must be body, not data
        };
      },
    }),
    deleteImage: builder.mutation({
      query: ( id) => {
        return {
          url: `/image/${id}`,
          method: "DELETE",          
        };
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateAdminProfileMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
  useGetAllAdminQuery,
  useCreateAdminMutation,
} = settingSlice;
