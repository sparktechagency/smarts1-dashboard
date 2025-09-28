import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({                           
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,                
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

export const imageUrl = import.meta.env.VITE_IMAGE_URL;
export const socketUrl = import.meta.env.VITE_SOCKET_URL;

