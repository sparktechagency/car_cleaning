import { api } from "../api/baseApi";
import {
  IAboutUs,
  IPrivacyPolicy,
  ITermsAndConditions,
} from "../interface/interface";

const drawerApiSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<ITermsAndConditions, any>({
      query: () => ({
        url: `/pages?type=Terms %26 Conditions`,
      }),
      providesTags: ["category"],
    }),
    getPrivacyAndPolicy: builder.query<IPrivacyPolicy, any>({
      query: () => ({
        url: `/pages?type=Privacy Policy`,
      }),
      providesTags: ["category"],
    }),
    getAboutUs: builder.query<IAboutUs, any>({
      query: () => ({
        url: `/pages?type=About Us`,
      }),
      providesTags: ["category"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useGetPrivacyAndPolicyQuery,
  useGetAboutUsQuery,
} = drawerApiSlices;
