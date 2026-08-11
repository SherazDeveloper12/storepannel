import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSettings = createAsyncThunk(
    'setting/fetchSettings',
    async (thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/settings/`, {
                withCredentials: true,
            });
            console.log('Settings fetched successfully from API:', response.data);
            return response.data;

        } catch (error) {
            console.error('Error fetching settings:', error);

            return error.data.message;
        }
    }
);
export const addCategory = createAsyncThunk('setting/addCategory',
    async (category) => {
        try {
            const response = await axios.post(`${BASE_URL}/settings/addCategory`, { category }, {
                withCredentials: true,
            });
            console.log('Category added successfully from API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding category:', error);
            return error.data.message;
        }
    }
);
export const addBrand = createAsyncThunk('setting/addBrand',
    async (brand) => {
        try {
            const response = await axios.post(`${BASE_URL}/settings/addBrand`, { brand }, {
                withCredentials: true,
            });
            console.log('Brand added successfully from API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding brand:', error);
            return error.data.message;
        }
    }
);
export const SettingSlice = createSlice({
    name: "setting",
    initialState: {
        categories: [],
        brands: [],
        loading: false,
        message: '',
        error: null,
    },
    reducers: {
        addCategorylocally: (state, action) => {
            localStorage.setItem('categories', JSON.stringify([...state.categories, action.payload]));
            state.categories.push(action.payload);
        },
        addBrandlocally: (state, action) => {
            localStorage.setItem('brands', JSON.stringify([...state.brands, action.payload]));
            state.brands.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.pending, (state) => {
            state.loading = true;
            state.error = null;
        }
        );
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('categories', JSON.stringify(action.payload.settings.categories));
            localStorage.setItem('brands', JSON.stringify(action.payload.settings.brands));
            state.categories = action.payload.settings.categories;
            state.brands = action.payload.settings.brands;
            state.message = action.payload.message;
        }
        );
        builder.addCase(fetchSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(addCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            localStorage.setItem('categories', JSON.stringify(action.payload.settings.categories));
            state.categories = action.payload.settings.categories;
            state.loading = false;
            state.message = action.payload.message;
        });
        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(addBrand.fulfilled, (state, action) => {
            localStorage.setItem('brands', JSON.stringify(action.payload.settings.brands));
            state.brands = action.payload.settings.brands;
            state.loading = false;
            state.message = action.payload.message;
        });
        builder.addCase(addBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        )
    }
})

export const { addCategorylocally, addBrandlocally } = SettingSlice.actions;
export default SettingSlice.reducer;