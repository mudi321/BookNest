import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import booksApi from './features/books/booksApi';
import ordersApi from './features/orders/ordersAPI';


export const store = configureStore({
  reducer: {
    cart: cartReducer, // Key matches the slice name
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});