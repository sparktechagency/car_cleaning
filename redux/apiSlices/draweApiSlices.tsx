import {
  IAboutUs,
  IPrivacyPolicy,
  ITermsAndConditions,
} from "../interface/interface";

import { api } from "../api/baseApi";

const drawerApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<ITermsAndConditions, any>({
      query: () => ({
        url: `/pages?type=Terms & Conditions`,
      }),
    }),
    getPrivacyAndPolicy: builder.query<IPrivacyPolicy, any>({
      query: () => ({
        url: `/pages?type=Privacy Policy`,
      }),
    }),
    getAboutUs: builder.query<IAboutUs, any>({
      query: () => ({
        url: `/pages?type=About Us`,
      }),
    }),
    support: builder.mutation<any, any>({
      query: (data) => ({
        url: `/support-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useGetPrivacyAndPolicyQuery,
  useGetAboutUsQuery,
  useSupportMutation,
} = drawerApiSlices;
