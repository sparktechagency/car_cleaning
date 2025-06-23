import { api } from "../api/baseApi";

const carApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    carPhoto: builder.mutation({
      query: (data) => ({
        url: `/car-photo`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    updateCarPhoto: builder.mutation({
      query: (id) => ({
        url: `/car-photo/${id}`,
        method: "PUT",
        body: id,
      }),
    }),

    deleteCarPhoto: builder.mutation({
      query: (id) => ({
        url: `/car-photo/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useCarPhotoMutation,
  useUpdateCarPhotoMutation,
  useDeleteCarPhotoMutation,
} = carApiSlices;
