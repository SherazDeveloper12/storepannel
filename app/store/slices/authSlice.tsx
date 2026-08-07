import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { stat } from "fs";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: FormData) => {
    try {
      console.log("data is being sent to backend", userData)
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      console.log("response from backend", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
);
export const otpSend = createAsyncThunk(
  "auth/otpSend",
  async (email: string) => {
    try {
      console.log("requesting otp for", email)
      const response = await axios.post(`${BASE_URL}/auth/sendOtp`, { email });
      console.log("response from backend", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
);
export const otpVerify = createAsyncThunk(
  "auth/otpVerify",
  async (data: { email: string, otp: number }) => {
    try {
      console.log("verifying otp for", data)
      const response = await axios.post(`${BASE_URL}/auth/verifyOtp`, data);
      console.log("response from backend", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    message: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to register user";
    })
    builder.addCase(otpSend.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(otpSend.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(otpSend.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to send OTP";
    }
    )
    builder.addCase(otpVerify.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.error.message || "Failed to verify OTP";
    }
    )
  }
})
export const { } = authSlice.actions
export default authSlice.reducer