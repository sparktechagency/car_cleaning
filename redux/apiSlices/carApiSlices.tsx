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
    }),
    updateCarPhoto: builder.mutation<any, any>({
      query: (id) => ({
        url: `/car-photo/${id}`,
        method: "PUT",
        body: id,
      }),
    }),

    deleteCarPhoto: builder.mutation<any, any>({
      query: (id) => ({
        url: `/car-photo/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),

    getServiceHistory: builder.query<any, any>({
      query: () => ({
        url: `/bookings?per_page=1`,
      }),
    }),
  }),
});

export const {
  useCarPhotoMutation,
  useUpdateCarPhotoMutation,
  useDeleteCarPhotoMutation,
  useGetServiceHistoryQuery,
} = carApiSlices;
