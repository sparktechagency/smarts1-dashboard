import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => "/faq",
      transformResponse: (res) => res?.data,
    }),
    addFAQ: builder.mutation({
      query: (data) => ({
        url: `/faq${location.search}`,
        method: "POST",
        body: data,
      }),
    }),
    updateFAQ: builder.mutation({
      query: ({ id, data }) => {
       console.log("update faq", data, id);
       
      //   return {
      //   url: `/faq/${id}`,
      //   method: "PATCH",
      //   body: data,
      // }
      },
    }),
    deleteFAQ: builder.mutation({
      query: (id)=> {
        return {
          url: `/faq/${id}`,
          method: "DELETE",          
        }
      }
    }),
})
})

export const {
  useGetFAQQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,

} = faqSlice;