import { api } from "../api/baseApi";

const homeApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: `/services`,
      }),
      providesTags: ["user", "service"],
    }),
    getPhotos: builder.query({
      query: () => ({
        url: `/photo-gallery`,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetServicesQuery, useGetPhotosQuery } = homeApiSlices;
