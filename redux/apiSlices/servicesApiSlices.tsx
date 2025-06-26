import { api } from "../api/baseApi";
import { ISingleService } from "../interface/interface";

const servicesApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getServicesById: builder.query<ISingleService, any>({
      query: (id) => ({
        url: `/services/${id}`,
      }),
      providesTags: ["service"],
    }),
  }),
});

export const { useGetServicesByIdQuery } = servicesApiSlices;
