import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: FormData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
        withCredentials: true, // Include cookies in the request
      });
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
      const response = await axios.post(`${BASE_URL}/auth/sendOtp`, { email }, {
        withCredentials: true, // Include cookies in the request
      });
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
      const response = await axios.post(`${BASE_URL}/auth/verifyOtp`, data,
        {
        
          withCredentials: true, // Include cookies in the request
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
);
export const getme = createAsyncThunk(
  "auth/getme",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true, // Include cookies in the request
      });
      return response.data;
    }
    catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
)
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string, password: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true, // Include cookies in the request
      });
      return response.data;
    }
    catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
)
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
        withCredentials: true, // Include cookies in the request
      });
      return response.data;
    }
    catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw error;
    }
  }
)
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    message: null,
    isAuthenticated: false,
    loading: false,
    error: null,
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem("email", action.payload.user.email);
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
    builder.addCase(getme.pending, (state) => {
      state.loading = true;
      state.error = null;
    }
    )
    builder.addCase(getme.fulfilled, (state, action) => {
      localStorage.setItem("email", action.payload.user.email);
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(getme.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to get user profile";
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    }
    )
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("email", action.payload.user.email);
      state.user = action.payload.user;
      
      state.message = action.payload.message;
      state.isAuthenticated = action.payload.user.isAuthenticated;
      state.loading = false;
      state.error = null;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to login";
    })
  }
})
export const { } = authSlice.actions
export default authSlice.reducer