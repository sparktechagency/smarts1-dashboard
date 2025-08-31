import { api } from "../api/baseApi";

const chatSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query({
      query: () => `/chat`,
      providesTags: ["Chat"]
    }),
    getCharByRoomId: builder.query({
      query: (id)=>`/message/${id}`,
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: (data)=> ({
        url: '/message',
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Messages', "Chat"]
    })
}),
})

export const {
useGetChatQuery,
useGetCharByRoomIdQuery,
useSendMessageMutation,
} = chatSlice