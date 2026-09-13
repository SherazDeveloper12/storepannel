import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from 'axios';
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchCoupons = createAsyncThunk(
    "Coupons/fetchCoupons",
    async () => {
        try {
            const storeID = localStorage.getItem('storeID');
            if (!storeID) {
                throw new Error('storeID not found in localStorage');
            }
            const response = await axios.get(`${BASE_URL}/Coupons?storeID=${storeID}`);
            return response.data;

        } catch (error) {

            return error.data.message;
        }
    }
);
export const updateCoupon = createAsyncThunk(
    "Coupons/updateCoupon",
    async (updatedCoupon) => {
        try {
            console.log("updatedCoupon in updateCoupon api call", updatedCoupon)
            const response = await axios.put(`${BASE_URL}/coupons/update/${updatedCoupon._id}`, updatedCoupon, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include credentials for authentication
            });
            return response.data;
        } catch (error) {
            return error.data.message;
        }
    });
export const deleteCoupon = createAsyncThunk(
    "Coupons/deleteCoupon",
    async (CouponId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/coupons/delete/${CouponId}`,{ withCredentials: true } );
            return CouponId;
        } catch (error) {
            return error.data.message;
        }
    });
export const createCoupon = createAsyncThunk(
    "Coupons/createCoupon",
    async (newCoupon) => {
        try {
            console.log("newCoupon in createCoupon api call", newCoupon)
            const response = await axios.post(`${BASE_URL}/coupons/create`, newCoupon, 
            { withCredentials: true }
            );
           console.log("response.data in createCoupon api call", response.data)
            return response.data;
        } catch (error) {
            console.log("error in createCoupon api call", error)
            throw error.response.data.message; // Throw the error to be caught in the rejected case
        }
    }
);
export const CouponSlice = createSlice({
    name: "Coupons",
    initialState: {
        Coupons: [],
        SelectedCouponId: null,
        status: "idle",
        error: null,
        message: null,
    },
    reducers: {
        fetchCouponsLocally: (state) => {
            state.status = "loading";
            const localCoupons = localStorage.getItem('Coupons');
            
            if (localCoupons) {
                state.Coupons = JSON.parse(localCoupons);               
            }
            state.status = "succeeded";
        },
       
        addSelectedCouponId: (state, action) => {
            state.SelectedCouponId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoupons.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchCoupons.fulfilled, (state, action) => {
            state.status = "succeeded";
            localStorage.setItem('Coupons', JSON.stringify(action.payload));
            state.Coupons = action.payload;
           
        });
        builder.addCase(fetchCoupons.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error;
            
        });
        builder.addCase(createCoupon.pending, (state) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.loading("Creating coupon...");
            state.status = "loading";
        });
        builder.addCase(createCoupon.fulfilled, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.success("Coupon created successfully");
           
            state.status = "succeeded";
            state.message = action.payload.message;
            localStorage.setItem('Coupons', JSON.stringify([action.payload.coupon, ...state.Coupons]));
            state.Coupons.unshift(action.payload.coupon);
        });
        builder.addCase(createCoupon.rejected, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.error("Failed to create coupon");
            console.log("action.error in createCoupon.rejected", action.error)
            state.status = "failed";
            state.error = action.error.message;
            state.message = action.error.message;
        });
        builder.addCase(deleteCoupon.pending, (state) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.loading("Deleting coupon...");
            state.status = "loading";
        });
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.success("Coupon deleted successfully");
            state.status = "succeeded";
            state.Coupons = state.Coupons.filter(Coupon => Coupon._id !== action.payload);

        });
        builder.addCase(deleteCoupon.rejected, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.error("Failed to delete coupon");
            state.status = "failed";
            state.error = action.error.message;
        });
        builder.addCase(updateCoupon.pending, (state) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.loading("Updating coupon...");
            state.status = "loading";
        });
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.success("Coupon updated successfully");
            state.status = "succeeded";
            console.log("action.payload in updateCoupon.fulfilled", action.payload)
            const index = state.Coupons.findIndex(coupon => coupon._id === action.payload.updatedcoupon._id);
            if (index !== -1) {
                state.Coupons[index] = action.payload.updatedcoupon;
                localStorage.setItem('Coupons', JSON.stringify(state.Coupons));
            }
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {
            toast.dismiss(); // Dismiss any existing toasts
            toast.error("Failed to update coupon");
            state.status = "failed";
            state.error = action.error.message;
        });
            

    }
});

export const { setFilters, clearFilters, addSelectedCouponId, fetchCouponsLocally,  } = CouponSlice.actions;
export default CouponSlice.reducer;