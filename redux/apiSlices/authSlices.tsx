import { addUser } from "../service/user";
import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query<any, any>({
      query: ({ page, limit = 100 }) => ({
        url: `/admin/user?per_page=${limit}&page=${page}`,
      }),
      providesTags: ["user"],
    }),

    getProfile: builder.query<any, any>({
      query: (token) => ({
        url: `/auth/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(addUser(data.data));
        } catch (error) {
          // console.log(error);
        }
      },
      providesTags: ["user", "photo", "service"],
    }),

    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/change-profile`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["user", "photo"],
    }),
    tokenCheck: builder.mutation<any, any>({
      query: (isToken) => ({
        url: `/auth/check-token`,
        method: "POST",
        body: isToken,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    register: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/check-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    forgetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    changeProfileImage: builder.mutation<any, any>({
      query: (photo) => ({
        url: `/auth/change-profile-photo`,
        method: "POST",
        body: photo,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["user"],
    }),
    googleLogin: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/social-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUserAccount: builder.mutation<any, any>({
      query: (password) => ({
        url: `/auth/profile-delete`,
        method: "POST",
        body: password,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useDeleteUserMutation,
  useLazyUserListQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useUpdateUserMutation,
  useUserListQuery,
  useLogoutMutation,
  useTokenCheckMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangeProfileImageMutation,
  useGoogleLoginMutation,
  useDeleteUserAccountMutation,
} = authSlice;
