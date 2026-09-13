import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const FetchAllOrders = createAsyncThunk(
    "order/fetchAllOrders",
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/orders/`,{withCredentials: true});
            const data = await response.data;
            return data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            throw error;
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ orderId, newStatus }) => {
        try {
            const response = await axios.put(`${BASE_URL}/orders/update-status/${orderId}`, { status: newStatus }, {
               withCredentials: true,
            });
            const data = await response.data;
            console.log("Order status updated successfully:", data);
            return data;
        } catch (error) {
            console.error("Error updating order status:", error);
            if (error.response) {
                throw error.response.data;
            }
            throw error;
        }
    }
);
export const fetchOrdersbyuserid = createAsyncThunk(
    "order/fetchOrdersbyuserid",
    async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/orders/user/${id}`);
            const data = await response.data.orders;
            return data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            }
            throw error;
        }
    });

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        selectedOrderId: null,
        status: "idle",
        error: null,
    },
    reducers: {
        setSelectedOrderId: (state, action) => {
            state.selectedOrderId = action.payload;
        },
        clearSelectedOrderId: (state) => {
            state.selectedOrderId = null;
        },
        addOrder: (state, action) => {
            console.log("Adding new order to state:", action.payload);
            const existingOrder = state.orders.find(order => order._id === action.payload._id);
            if (!existingOrder) {
                state.orders.push(action.payload);
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }
        },
        updateOrderLocally: (state, action) => {
            const updatedOrder = action.payload;
            const updatestate = state.orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
            state.orders = updatestate;
            localStorage.setItem("orders", JSON.stringify(state.orders));

        },
        fetchOrders: (state, action) => {
            const storedOrders = localStorage.getItem("orders");
            if (storedOrders) {
                state.orders = JSON.parse(storedOrders);
            }
        },
        fetchAllOrdersLocally: (state, action) => {
            const storedOrders = localStorage.getItem("allorders");
            if (storedOrders) {
                state.orders = JSON.parse(storedOrders);
            }
        },
        clearOrders: (state) => {
            state.orders = [];
            localStorage.removeItem("orders");
        },
        resetOrdersStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        
        builder
            .addCase(FetchAllOrders.pending, (state) => {
                state.status = "loading";

            })
            .addCase(FetchAllOrders.fulfilled, (state, action) => {
                localStorage.setItem("allorders", JSON.stringify(action.payload.orders));
                state.orders = action.payload.orders;
            })
            .addCase(FetchAllOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(updateOrderStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedOrder = action.payload;
                const index = state.orders.findIndex(order => order._id === updatedOrder._id);
                state.orders[index] = updatedOrder;
                localStorage.setItem("orders", JSON.stringify(state.orders));
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(fetchOrdersbyuserid.pending, (state) => {
            })
            .addCase(fetchOrdersbyuserid.fulfilled, (state, action) => {
                state.orders = action.payload;
                localStorage.setItem("orders", JSON.stringify(state.orders));
            })
            .addCase(fetchOrdersbyuserid.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});
export const {
    fetchOrders, clearOrders, resetOrdersStatus,
    updateOrderLocally,
    addOrder,
    fetchAllOrdersLocally,
    setSelectedOrderId, clearSelectedOrderId } = orderSlice.actions;

export default orderSlice.reducer;
