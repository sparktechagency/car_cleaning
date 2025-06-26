import { api } from "../api/baseApi";

const bookingSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    bookingIntent: builder.mutation<any, any>({
      query: (data) => ({
        url: `/booking-intent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    bookingSuccess: builder.mutation<any, any>({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking", "service"],
    }),
  }),
});

export const { useBookingIntentMutation, useBookingSuccessMutation } =
  bookingSlices;
