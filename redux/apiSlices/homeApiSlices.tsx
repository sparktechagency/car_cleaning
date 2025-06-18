import { api } from "../api/baseApi";

const homeApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: `/services`,
      }),
      providesTags: ["category"],
    }),
    getPhotos: builder.query({
      query: () => ({
        url: `/photo-gallery`,
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetServicesQuery, useGetPhotosQuery } = homeApiSlices;
