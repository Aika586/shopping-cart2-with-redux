import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/products/ProductsSlice"


export const store = configureStore({
  reducer: {
    products:cartReducer
    
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
