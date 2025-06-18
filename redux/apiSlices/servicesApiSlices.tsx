import { api } from "../api/baseApi";

const servicesApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getServicesById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetServicesByIdQuery } = servicesApiSlices;
