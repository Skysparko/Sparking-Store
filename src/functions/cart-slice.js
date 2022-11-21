import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart(state, action) {
      const { Product, quantity = 1 } = action.payload;

      const existingItem = state.value.find(
        ({ Product: prod }) => prod.id === Product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.value.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const { Product } = action.payload;
      const index = state.value.findIndex(
        ({ Product: prod }) => prod.id === Product.id
      );
      if (index > -1) {
        const existingItem = state.value[index];
        if (existingItem.quantity === 1) {
          state.value.splice(index, 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
