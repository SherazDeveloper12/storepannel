import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import ProductReducer from './slices/productsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch