import { api } from "../api/baseApi";

const chatSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query({
      query: () => `/chat`
    }),
    getCharByRoomId: builder.query({
      query: (id)=>`/message/${id}`
    })
}),
})

export const {
useGetChatQuery,
useGetCharByRoomIdQuery,
} = chatSlice