import { api } from "../api/baseApi";

const chatSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query({
      query: () => `/chat`
    }),
    getCharByRoomId: builder.query({
      query: (id)=>`/message/${id}`
    }),
    sendMessage: builder.mutation({
      query: (data)=> ({
        url: '/message',
        method: "POST",
        body: data,
      })
    })
}),
})

export const {
useGetChatQuery,
useGetCharByRoomIdQuery,
useSendMessageMutation,
} = chatSlice