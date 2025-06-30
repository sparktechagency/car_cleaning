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
    getBlockedServiceDate: builder.query<any, any>({
      query: () => ({
        url: `/manage-dates`,
      }),
      providesTags: ["service"],
    }),
    getFreeTimes: builder.query<any, any>({
      query: ({ service_id, date }) => ({
        url: `/get_free_times?service_id=${service_id}&date=${date}`,
      }),
      providesTags: ["service"],
    }),
  }),
});

export const {
  useGetServicesByIdQuery,
  useGetBlockedServiceDateQuery,
  // useGetFreeTimesQuery,
  useLazyGetFreeTimesQuery,
} = servicesApiSlices;
