import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSettings = createAsyncThunk(
    'setting/fetchSettings',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/settings/`, {
                withCredentials: true,
            });
            return response.data;

        } catch (error) {

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
            return response.data;
        } catch (error) {
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
            return response.data;
        } catch (error) {
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
        sidebarOpen: true,
        error: null,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        addCategorylocally: (state, action) => {
            localStorage.setItem('categories', JSON.stringify([...state.categories, action.payload]));
            state.categories.push(action.payload);
        },
        deleteCategorylocally: (state, action) => {
            const updatedCategories = state.categories.filter(category => category !== action.payload);
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
            state.categories = updatedCategories;
        },
        updateCategorylocally: (state, action) => {
            const { oldCategory, newCategory } = action.payload;
            const updatedCategories = state.categories.map(category => category === oldCategory ? newCategory : category);
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
            state.categories = updatedCategories;
        },
        updateBrandlocally: (state, action) => {
            const { oldBrand, newBrand } = action.payload;
            const updatedBrands = state.brands.map(brand => brand === oldBrand ? newBrand : brand);
            localStorage.setItem('brands', JSON.stringify(updatedBrands));
            state.brands = updatedBrands;
        },
        deleteBrandlocally: (state, action) => {
            const updatedBrands = state.brands.filter(brand => brand !== action.payload);
            localStorage.setItem('brands', JSON.stringify(updatedBrands));
            state.brands = updatedBrands;
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

export const { toggleSidebar, addCategorylocally, addBrandlocally, deleteCategorylocally, updateCategorylocally, updateBrandlocally, deleteBrandlocally } = SettingSlice.actions;
export default SettingSlice.reducer;