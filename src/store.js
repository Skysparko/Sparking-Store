import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./functions/cart-slice";
import categoriesSlice from "./functions/categories-slice";
import productsSlice from "./functions/products-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsSlice,
    categories: categoriesSlice,
  },
});
