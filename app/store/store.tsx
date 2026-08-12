import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import ProductReducer from './slices/productsSlice'
import SettingReducer from './slices/settingSlice'
import categoryReducer from './slices/categorySlice'
import brandReducer from './slices/brandSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductReducer,
    setting: SettingReducer,
    categories: categoryReducer,
    brands: brandReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch