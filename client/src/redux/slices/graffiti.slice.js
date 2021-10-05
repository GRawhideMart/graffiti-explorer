import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GraffitiService from "../../services/graffitis.service";

export const fetchGraffiti = createAsyncThunk(
  "graffiti/fetchGraffiti",
  async () => {
    const res = await GraffitiService.getAll();
    return res.data;
  }
);

const graffitiSlice = createSlice({
  name: "graffiti",
  initialState: { items: [], loading: false, errorMessage: "" },
  reducers: {},
  extraReducers: {
    [fetchGraffiti.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchGraffiti.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [fetchGraffiti.rejected]: (state, action) => {
      state.errorMessage = action.error.message || "Couldn't fetch items";
      state.loading = false;
    },
  },
});

export default graffitiSlice.reducer;
