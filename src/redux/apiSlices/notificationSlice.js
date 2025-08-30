import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        notification: builder.query({
            query: ()=> {
                return{
                    url: `/notifications`,
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
        read: builder.mutation({
            query: ()=> {
                return{
                    url: `/notifications`,
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            }
        }),
        pushNotification: builder.mutation({
            query: (data)=>({
                url: "/notification/admin/send-notification",
                method: "POST",
                body: data,
            })
        }),
        getAdminNotification: builder.query({
            query: ()=>`notification/admin${location?.search}`
        }),
        readAllNotification: builder.mutation({
            query: ()=>({
                url: "/notification/admin/read-all",
                method: "PATCH"
            })
        })
    })
})

export const {
    useNotificationQuery,
    useReadMutation,
    usePushNotificationMutation,
    useGetAdminNotificationQuery,
    useReadAllNotificationMutation
} = notificationSlice;