// src/App.js

import React from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import store from "./store";
import GameScreen from "./components/GameScreen";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9100" },
    background: { default: "#fafafa" },
    success: { main: "#43a047" },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameScreen />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

// end of code
