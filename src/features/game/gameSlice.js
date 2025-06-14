import { createSlice } from "@reduxjs/toolkit";
import { saveState, loadState } from "../storage/localStorage";

const initialState = loadState() || {
  year: 2025,
  producers: [],
  movies: [],
  oscars: [],
  news: [],
  gameStats: {},
  running: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state) {
      state.running = true;
      saveState(state); // Save state when the game starts
    },
    playNextYear(state) {
      // Example logic for progressing the game
      state.year += 1;
      saveState(state);
    },
    resetGame(state) {
      Object.assign(state, initialState);
      saveState(state);
    },
  },
});

export const { startGame, playNextYear, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
