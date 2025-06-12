// src/features/game/gameSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { initializeProducers } from '../producers/producerUtils';
import { playYear } from './gameLogic';
import { loadState, saveState } from '../storage/localStorage';

const initialState = loadState() || {
  year: 2025,
  producers: initializeProducers(),
  movies: [],
  oscars: [],
  news: [],
  gameStats: {},
  running: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.running = true;
    },
    playNextYear(state) {
      const { movies, oscars, news, producers } = playYear(state);
      state.movies.push(...movies);
      state.oscars.push(oscars);
      state.news.push(...news);
      state.producers = producers;
      state.year += 1;
      saveState(state); // Persist after every year
    },
    resetGame(state) {
      Object.assign(state, {
        ...initialState,
        producers: initializeProducers(),
        movies: [],
        oscars: [],
        news: [],
        gameStats: {},
        year: 2025,
        running: false,
      });
      saveState(state);
    },
    loadGame(state, action) {
      // Load state from saved game
      Object.assign(state, action.payload);
    },
  },
});

export const { startGame, playNextYear, resetGame, loadGame } = gameSlice.actions;
export default gameSlice.reducer;

// end of code
