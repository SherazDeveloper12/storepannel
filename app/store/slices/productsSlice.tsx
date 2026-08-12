import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const storeID = localStorage.getItem('storeID');
            if (!storeID) {
                throw new Error('storeID not found in localStorage');
            }
            const response = await axios.get(`${BASE_URL}/products?storeID=${storeID}`);
            return response.data;

        } catch (error) {

            return error.data.message;
        }
    }
);
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (updatedProduct) => {
        try {

            const response = await axios.put(`${BASE_URL}/products/update/${updatedProduct._id}`, updatedProduct, {
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
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/products/delete/${productId}`,{ withCredentials: true } );
            return productId;
        } catch (error) {
            return error.data.message;
        }
    });
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (newProduct) => {
        try {
            const response = await axios.post(`${BASE_URL}/products/create`, newProduct, 
            { withCredentials: true } // Include credentials for authentication
            );
           
            return response.data;
        } catch (error) {
            return error.data.message;
        }
    }
);
export const ProductSlice = createSlice({
    name: "products",
    initialState: {
        Products: [],
        Filters: [],
        status: "idle",
        error: null,
    },
    reducers: {
        fetchProductsLocally: (state) => {
            state.status = "loading";
            const localProducts = localStorage.getItem('products');
            
            if (localProducts) {
                state.Products = JSON.parse(localProducts);               
            }
            state.status = "succeeded";
        },
        setFilters: (state, action) => {
            if (action.payload.type === 'Condition') {

                const existingConditionFilterIndex = state.Filters.findIndex(filter => filter.type === 'Condition');

                if (existingConditionFilterIndex !== -1) {
                    if (action.payload.value === 'Any') {
                        state.Filters.splice(existingConditionFilterIndex);
                    }
                    else {
                        state.Filters[existingConditionFilterIndex].value = action.payload.value;
                    }
                }
                else {
                    state.Filters.push({ type: action.payload.type, value: action.payload.value });
                }
            }
            if (action.payload.type === 'Brands') {
                const existingBrandFilterIndex = state.Filters.findIndex(filter => filter.type === 'Brands');
                if (existingBrandFilterIndex !== -1) {
                    if (action.payload.checked === false) {
                        state.Filters[existingBrandFilterIndex].value =
                            state.Filters[existingBrandFilterIndex].value.filter(brand => brand !== action.payload.value);
                        if (state.Filters[existingBrandFilterIndex].value.length === 0) {
                            state.Filters.splice(existingBrandFilterIndex, 1);
                        }
                    }
                    else {
                        state.Filters[existingBrandFilterIndex].value = [...state.Filters[existingBrandFilterIndex].value, action.payload.value];
                    }
                }
                else {
                    state.Filters.push({ type: action.payload.type, value: [action.payload.value] });
                }
            }
            if (action.payload.type === 'Features') {
                const existingFeatureFilterIndex = state.Filters.findIndex(filter => filter.type === 'Features');
                if (existingFeatureFilterIndex !== -1) {
                    if (action.payload.checked === false) {
                        state.Filters[existingFeatureFilterIndex].value =
                            state.Filters[existingFeatureFilterIndex].value.filter(feature => feature !== action.payload.value);
                        if (state.Filters[existingFeatureFilterIndex].value.length === 0) {
                            state.Filters.splice(existingFeatureFilterIndex, 1);
                        }
                    }
                    else {
                        state.Filters[existingFeatureFilterIndex].value = [...state.Filters[existingFeatureFilterIndex].value, action.payload.value];
                    }
                }
                else {
                    state.Filters.push({ type: action.payload.type, value: [action.payload.value] });
                }
            }
            if (action.payload.type === 'Rating') {
                const existingBrandFilterIndex = state.Filters.findIndex(filter => filter.type === 'Rating');
                if (existingBrandFilterIndex !== -1) {
                    if (action.payload.checked === false) {
                        state.Filters[existingBrandFilterIndex].value =
                            state.Filters[existingBrandFilterIndex].value.filter(brand => brand !== action.payload.value);
                        if (state.Filters[existingBrandFilterIndex].value.length === 0) {
                            state.Filters.splice(existingBrandFilterIndex, 1);
                        }
                    }
                    else {
                        state.Filters[existingBrandFilterIndex].value = [...state.Filters[existingBrandFilterIndex].value, action.payload.value];
                    }
                }
                else {
                    state.Filters.push({ type: action.payload.type, value: [action.payload.value] });
                }
            }

        },
        clearFilters: (state) => {
            state.Filters = [];
        },
        addSelectedProduct: (state, action) => {
            const selectedProduct = action.payload;
            const res = state.Products.find(product => product.uid === selectedProduct.uid);
            state.SelectedProduct = res;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            localStorage.setItem('products', JSON.stringify(action.payload));
            state.Products = action.payload;
           
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        
        builder.addCase(createProduct.fulfilled, (state, action) => {
            localStorage.setItem('products', JSON.stringify([action.payload, ...state.Products]));
            state.Products.unshift(action.payload);
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.Products = state.Products.filter(product => product._id !== action.payload);

        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.error = action.error.message;
        });

    }
});

export const { setFilters, clearFilters, addSelectedProduct, fetchProductsLocally,  } = ProductSlice.actions;
export default ProductSlice.reducer;