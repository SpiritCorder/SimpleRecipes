import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../../config/axios";

export const logoutAuthUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    try {
      await axiosPublic.get("/auth/logout");
      //logout success
      return {};
    } catch (err) {
      return {};
    }
  }
);

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // update auth state with the payload after successfully login
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAuthUserThunk.fulfilled, (state, action) => {
      state.accessToken = null;
      state.user = null;
    });
  },
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthInfo = (state) => state.auth;

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
