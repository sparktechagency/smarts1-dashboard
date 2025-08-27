import { api } from "../api/baseApi";

const cmsSlice = api.injectEndpoints({
endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => "/faq",      
    }),
    addFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
    }),
    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFAQ: builder.mutation({
      query: (id)=> {
        return {
          url: `/faq/${id}`,
          method: "DELETE",          
        }
      }
    }),
    addDesclaimer: builder.mutation({
      query: (data)=>({
        url: "/settings",
        method: "PUT",
        body: data,
      })
    }),

    updateContact: builder.mutation({
      query: (data)=>({
        url: "/settings",
        method: "PUT",
        body: data,
      })
    }),

    getPrivecyPolicy: builder.query({
      query: () => "/settings/privacy-policy",      
    }),

    getTarmsAndCondition: builder.query({
      query: () => "/settings/terms-and-conditions",      
    }),

    getContact: builder.query({
      query: () => "/settings/contact-info",      
    }),
})
})

export const {
  useGetFAQQuery,

  useGetPrivecyPolicyQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,

  useGetContactQuery,
  useUpdateContactMutation,
  useGetTarmsAndConditionQuery,
  useAddDesclaimerMutation,

} = cmsSlice;