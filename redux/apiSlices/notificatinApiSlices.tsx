import { api } from "../api/baseApi";

const notificationApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
    }),
    markNotificationMutation: builder.query({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        body: id,
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useMarkNotificationMutationQuery } =
  notificationApiSlices;
