// src/store.js

import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// end of code
