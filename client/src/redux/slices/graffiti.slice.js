import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GraffitiService from "../../services/graffitis.service";

export const fetchGraffiti = createAsyncThunk(
  "graffiti/fetchGraffiti",
  async () => {
    const res = await GraffitiService.getAll();
    return res.data;
  }
);

export const toggleFavorite = createAsyncThunk(
  "graffiti/toggleFavorite",
  async ({ id, data }) => {
    const res = await GraffitiService.toggleFavorite({ id, data });
    return res.data;
  }
);

const initialState = { items: [], loading: false, errorMessage: "" };

const graffitiSlice = createSlice({
  name: "graffiti",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGraffiti.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchGraffiti.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    [fetchGraffiti.rejected]: (state, action) => {
      state.errorMessage = action.error.message || "Couldn't fetch items";
      state.loading = false;
    },
    [toggleFavorite.pending]: (state, action) => {
      state.loading = true;
    },
    [toggleFavorite.rejected]: (state, action) => {
      state.errorMessage = action.error.message || "Couldn't change fav status";
      state.loading = false;
    },
    [toggleFavorite.fulfilled]: (state, action) => {
      const index = state.items[0].features.findIndex(
        (graffiti) => graffiti.properties.id === action.payload.id
      );
      console.log(state.items[0].features[index].properties.isFavorite);
      state.items[0].features[index].properties.isFavorite =
        !state.items[0].features[index].properties.isFavorite;
    },
  },
});

export default graffitiSlice.reducer;
