import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    return await res.json();
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});
export default categorySlice.reducer;
