import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const FetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchAllProducts.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});
export default productSlice.reducer;
