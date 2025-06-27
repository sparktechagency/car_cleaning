import { api } from "../api/baseApi";

const carApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    carPhoto: builder.mutation<any, any>({
      query: (data) => ({
        url: `/car-photo`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["photo"],
    }),
    updateCarPhoto: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: `/car-photo/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),

    deleteCarPhoto: builder.mutation<any, any>({
      query: (id) => ({
        url: `/car-photo/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["photo"],
    }),

    getServiceHistory: builder.query<any, any>({
      query: () => ({
        url: `/bookings?per_page=1`,
      }),
      providesTags: ["photo"],
    }),
  }),
});

export const {
  useCarPhotoMutation,
  useUpdateCarPhotoMutation,
  useDeleteCarPhotoMutation,
  useGetServiceHistoryQuery,
} = carApiSlices;
