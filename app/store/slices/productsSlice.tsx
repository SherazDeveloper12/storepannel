import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import type {
  Product,
  ProductFilter,
  ProductInput,
  ProductState,
} from "@/app/types/store";
import { getApiErrorMessage } from "@/app/store/apiError";
type ThunkConfig = {
  rejectValue: string;
};
interface UpdateProductResponse {
  updatedProduct: Product;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const initialState: ProductState = {
  Products: [],
  Filters: [],
  SelectedProduct: null,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<  Product[],
  void,
  ThunkConfig
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const storeID = localStorage.getItem("storeID");

    if (!storeID) {
      return rejectWithValue("Store ID not found");
    }

    const response = await axios.get<Product[]>(
      `${BASE_URL}/products?storeID=${storeID}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const createProduct = createAsyncThunk< 
 Product,
  ProductInput,
  ThunkConfig
>("products/createProduct", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post<Product>(
      `${BASE_URL}/products/create`,
      newProduct,
      { withCredentials: true }
    );

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  Product,
  ThunkConfig
>("products/updateProduct", async (updatedProduct, { rejectWithValue }) => {
  try {
    const response = await axios.put<Product>(
      `${BASE_URL}/products/update/${updatedProduct._id}`,
      updatedProduct,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  string,
  ThunkConfig
>("products/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/products/delete/${productId}`, {
      withCredentials: true,
    });

    return productId;
  } catch (error: unknown) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});


export const ProductSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        fetchProductsLocally: (state) => {
            
            const localProducts = localStorage.getItem('products');
            
            if (localProducts) {

                state.Products = JSON.parse(localProducts);               
            }
            
        },
       
        addSelectedProduct: (state,   action: PayloadAction<Product>) => {
            const res = state.Products.find(
          (product) => product._id === action.payload._id
        ) ?? null;
            state.SelectedProduct = res;
        }
    },
      extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to create product";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.Products.findIndex(
          (product) => product._id === action.payload._id
        );

        if (index !== -1) {
          state.Products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to update product";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Products = state.Products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Failed to delete product";
      });
  },
});


export const {  addSelectedProduct, fetchProductsLocally,  } = ProductSlice.actions;
export default ProductSlice.reducer;