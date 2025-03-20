import { configureStore } from "@reduxjs/toolkit";
import CartSlise from "./slices/CartSlise";
import { authSlice } from "./apis/authSlice";
import { orderSlice } from "./apis/orderSlice";
import { categoriesSlice } from "./apis/categoriesSlice";
import { productSlice } from "./apis/productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: CartSlise,
      [authSlice.reducerPath]: authSlice.reducer,
      [orderSlice.reducerPath]: orderSlice.reducer,
      [categoriesSlice.reducerPath]: categoriesSlice.reducer,
      [productSlice.reducerPath]: productSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authSlice.middleware,
        orderSlice.middleware,
        categoriesSlice.middleware,
        productSlice.middleware
      ),
  });
};
