import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://206.189.231.81:5000/api/v1"
        // baseUrl: "http://10.10.7.79:7003/api/v1",        
        baseUrl: import.meta.env.BASE_URL,        
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

// export const imageUrl = "http://206.189.231.81:5000";
// export const imageUrl = "http://10.10.7.79:7003";
export const imageUrl = "http://157.241.34.32:3000";
// export const socketUrl = "ws://10.10.7.79:6003";
export const socketUrl = import.meta.env.SOCKET_URL;

// http://10.10.7.79:7003/api/v1