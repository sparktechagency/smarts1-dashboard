import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://206.189.231.81:5000/api/v1"
        // baseUrl: "http://10.10.7.79:7003/api/v1",        
        baseUrl: import.meta.env.BASE_URL,        
        // baseUrl: 'http://157.241.91.8:3000/api/v1',        
         prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
     credentials: "include",
    }),
    tagTypes: ["Chat"],
    endpoints: () => ({})
});

export const imageUrl = import.meta.env.BASE_URL;
export const socketUrl = import.meta.env.SOCKET_URL;
// export const imageUrl = 'http://157.241.91.8:3000';
// export const socketUrl = 'http://157.241.91.8:3000/api/v1';