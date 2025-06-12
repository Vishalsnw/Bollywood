// src/features/storage/localStorage.js

const STORAGE_KEY = "bollywood_sim_game_state";

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors
  }
}

export function loadState() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

// end of code
