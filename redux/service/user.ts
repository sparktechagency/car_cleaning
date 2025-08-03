import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  car_brand: string | null;
  car_model: string | null;
  car_photos: any;
  created_at: string;
  email: string;
  email_verified_at: string;
  google_id: string | null;
  id: number;
  name: string;
  otp: string | null;
  otp_expires_at: string | null;
  phone: string;
  photo: string;
  role: string;
  updated_at: string;
}

const initialState: userState | any = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action?.payload;
    },

    removeUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
