import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import type { Customer } from '@/app/types/store';
import { getApiErrorMessage } from '@/app/store/apiError';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface CustomerState {
    customers: Customer[];
    selectedcustomer: Customer | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message: string | null;
}

const initialState: CustomerState = {
    customers: [],
    selectedcustomer: null,
    status: 'idle',
    error: null,
    message: null,
};


export const FetchAllcustomers = createAsyncThunk(
    "customer/fetchAllcustomers",
    async () => {
        try {
           
            const response = await axios.get(`${BASE_URL}/customers/`, { withCredentials: true });
            const data = await response.data;
             console.log("fetching all customers from backend" , data)
            return data;
        } catch (error: unknown) {
            throw new Error(getApiErrorMessage(error));
        }
    }
);

export const contactCustomer = createAsyncThunk<unknown, { customerEmail: string; subject: string; message: string }>(
    "customer/contactCustomer",
    async (customerData) => {
        try {
            const response = await axios.post(`${BASE_URL}/customers/contactCustomer`, customerData, { withCredentials: true });
            const data = await response.data;
            return data;
        } catch (error: unknown) {
            throw new Error(getApiErrorMessage(error));
        }
    }
);


export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setSelectedcustomer: (state, action) => {
            state.selectedcustomer = action.payload;
        },
        clearSelectedcustomer: (state) => {
            state.selectedcustomer = null;
        },

        fetchAllcustomersLocally: (state) => {
            const storedcustomers = localStorage.getItem("allcustomers");
            if (storedcustomers) {
                state.customers = JSON.parse(storedcustomers);
            }
        },
        clearcustomers: (state) => {
            state.customers = [];
            localStorage.removeItem("customers");
        },
        resetcustomersStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(FetchAllcustomers.pending, (state) => {
                state.status = "loading";

            })
            .addCase(FetchAllcustomers.fulfilled, (state, action) => {
                localStorage.setItem("allcustomers", JSON.stringify(action.payload.customers));
                state.customers = action.payload.customers;
            })
            .addCase(FetchAllcustomers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch customers";
            });
            builder
            .addCase(contactCustomer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(contactCustomer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = (action.payload as { message?: string }).message ?? null;
            })
            .addCase(contactCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to contact customer";
            });

    }
});
export const {
    clearcustomers, resetcustomersStatus,

    fetchAllcustomersLocally,
    setSelectedcustomer, clearSelectedcustomer } = customerSlice.actions;

export default customerSlice.reducer;
