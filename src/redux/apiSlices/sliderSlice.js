// /settings/contact-info

import { api } from "../api/baseApi";

const sliderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => `/image/sliderImage`,
    }),
    getOnBoardImage: builder.query({
      query: () => `/image/onboardingImage`,
    }),
    addSlider: builder.mutation({
        query: (data)=>({
            url: "image",
            method: "POST",
            body: data
        })
    })
  }),
});


export const { useGetSlidersQuery, useGetOnBoardImageQuery, useAddSliderMutation, } = sliderSlice;