import { api } from "../api/baseApi";

const homeApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: `/services`,
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetServicesQuery } = homeApiSlices;
