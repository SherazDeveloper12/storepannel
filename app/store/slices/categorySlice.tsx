import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`, {
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
  })
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData: FormData) => {
    try {
    
      const response = await axios.post(`${BASE_URL}/categories/addCategory`, categoryData, {
        withCredentials: true, // Include cookies in the request
      });
      return response.data;
    }
    catch (error) {
      if (error.response) {
        throw error.response.data;
      }
        throw error;
    }})
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/categories/deleteCategory/?id=${categoryId}`, {
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
    })
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  
  async (data: { categoryId: string, categoryData: FormData }) => {
    
    try {
    
      const response = await axios.post(`${BASE_URL}/categories/updateCategory/?id=${data.categoryId}`, data.categoryData, {
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
  })
export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    message: null,
    },
    reducers: {
      fetchCategoriesLocally: (state, action) => {
        const categories = localStorage.getItem('categories');
        if (categories) {
          state.categories = JSON.parse(categories);
        }
      },
      addCategoryLocally: (state, action) => {
        state.categories.push(action.payload);
        localStorage.setItem('categories', JSON.stringify(state.categories));
      },
      
      updateCategoryLocally: (state, action) => {
               

        const index = state.categories.findIndex((category) => category._id === action.payload.categoryId);
        
        if (index !== -1) {
          state.categories[index] = action.payload.categoryData;
          localStorage.setItem('categories', JSON.stringify(state.categories));
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        localStorage.setItem('categories', JSON.stringify(action.payload.categories));
      })
      builder.addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      builder.addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.category);
      })
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category._id !== action.payload.category._id);
      })
      builder.addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }
      })
    }
})

export const { 
fetchCategoriesLocally, addCategoryLocally,  updateCategoryLocally
 } = CategorySlice.actions
export default CategorySlice.reducer