import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const fetchBrands = createAsyncThunk(
  "brand/fetchbrands",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/brands`, {
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
export const addBrand = createAsyncThunk(
  "brand/addbrand",
  async (brandData: FormData) => {
    try {
    
      const response = await axios.post(`${BASE_URL}/brands/addbrand`, brandData, {
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
export const deleteBrand = createAsyncThunk(
  "brand/deletebrand",
  async (brandId: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/brands/deletebrand/?id=${brandId}`, {
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
export const updateBrand = createAsyncThunk(
  "brand/updatebrand",
  
  async (data: { brandId: string, brandData: FormData }) => {
    
    try {
     
      const response = await axios.post(`${BASE_URL}/brands/updatebrand/?id=${data.brandId}`, data.brandData, {
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
export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
    message: null,
    },
    reducers: {
      fetchBrandsLocally: (state, action) => {
        const brands = localStorage.getItem('brands');
        if (brands) {
          state.brands = JSON.parse(brands);
        }
      },
      addBrandLocally: (state, action) => {
        state.brands.push(action.payload);
        localStorage.setItem('brands', JSON.stringify(state.brands));
      },
      
      updateBrandLocally: (state, action) => {
               

        const index = state.brands.findIndex((brand) => brand._id === action.payload.brandId);
       
        if (index !== -1) {
          state.brands[index] = action.payload.brandData;
          localStorage.setItem('brands', JSON.stringify(state.brands));
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.brands;
        localStorage.setItem('brands', JSON.stringify(action.payload.brands));
      })
      builder.addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch brands";
      })
      builder.addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload.brand);
      })
      builder.addCase(deleteBrand.fulfilled, (state, action) => {
       
        state.brands = state.brands.filter((brand) => brand._id !== action.payload.brand._id);
      })
      builder.addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex((brand) => brand._id === action.payload._id);
     
        if (index !== -1) {
          
          state.brands[index] = action.payload.brand;
        }
      })
    }
})

export const { 
fetchBrandsLocally, addBrandLocally,  updateBrandLocally
 } = brandSlice.actions
export default brandSlice.reducer