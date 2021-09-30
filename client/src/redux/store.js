import { configureStore } from "@reduxjs/toolkit";
import coordinates from "./slices/coordinates.slice";

const store = configureStore({
  reducer: {
    coordinates,
  },
});

export default store;
