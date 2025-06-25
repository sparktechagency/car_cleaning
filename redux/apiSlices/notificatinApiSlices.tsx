import { api } from "../api/baseApi";

const notificationApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
    }),
    getNotificationDetails: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
      }),
    }),
    feedBackSend: builder.mutation({
      query: (data) => ({
        url: `/feedbacks`,
        method: "POST",
        body: data,
      }),
    }),
    markNotification: builder.mutation<any, any>({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useGetNotificationDetailsQuery,
  useFeedBackSendMutation,
  useMarkNotificationMutation,
} = notificationApiSlices;
