import { configureStore } from "@reduxjs/toolkit";
import coordinates from "./slices/coordinates.slice";
import graffiti from "./slices/graffiti.slice";

const store = configureStore({
  reducer: {
    coordinates,
    graffiti,
  },
});

export default store;
