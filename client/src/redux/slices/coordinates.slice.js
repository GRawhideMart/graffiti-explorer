import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CoordinatesService from "../../services/coordinates.service";

export const fetchCoordinates = createAsyncThunk(
  "coordinates/fetchCoordinates",
  async () => {
    const res = await CoordinatesService.getAll();
    return res.data;
  }
);

const locationSlice = createSlice({
  name: "coordinates",
  initialState: { coordinates: [], loading: false, errorMessage: "" },
  reducers: {},
  extraReducers: {
    [fetchCoordinates.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCoordinates.fulfilled]: (state, action) => {
      state.coordinates.push(action.payload);
    },
    [fetchCoordinates.rejected]: (state, action) => {
      state.errorMessage = action.error.message || "Couldn't fetch items";
      state.loading = false;
    },
  },
});

export default locationSlice.reducer;
