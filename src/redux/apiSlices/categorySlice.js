import { api } from "../api/baseApi";


const categorySlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createCategory: builder.mutation({
            query: (categoryData)=> {
                return{
                    url: "/service-category",
                    method: "POST",
                    body: categoryData,                   
                }
            }
        }),
         getServiceCategory: builder.query({
      query: () => ({
        // url: `/coupon/admin?searchTerm=${searchTerm || ''}&page=${page}&limit=${limit}`,
        url: `/service-category`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data, // optional transformation of the response
    }),
        updateCategory: builder.mutation({
            query: ({ id, updatedData})=> {
                return{
                    url: `/category/update-category/${id}`,
                    method: "PATCH",
                    body: updatedData,
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
        deleteCategory: builder.mutation({
            query: (id)=> {
                return{
                    url: `/category/delete-category/${id}`,
                    method: "DELETE",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
        category: builder.query({
            query: ()=> {
                return{
                    url: "/category/get-category",
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
    })
})

export const {
    useCategoryQuery,
    useGetServiceCategoryQuery,
    
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categorySlice;