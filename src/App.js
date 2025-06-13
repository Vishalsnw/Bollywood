// src/App.js

import React from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";

// UI Components
import Sidebar from "./components/Sidebar";
import GameScreen from "./components/GameScreen";
import ProducerList from "./features/producers/ProducerList";
import NewsFeed from "./features/news/NewsFeed";
import WinnerReveal from "./features/oscars/WinnerReveal";

// Dummy Data
const dummyProducers = [
  { name: "Karan Johar", wealth: 600, rankChange: 1 },
  { name: "Aditya Chopra", wealth: 580, rankChange: -1 },
];

const dummyNews = [
  "Karan Johar takes ₹500cr loan from SBI!",
  "Ram Gopal Varma declares bankruptcy 😬",
  "Rohit Shetty launches new movie with AI actors!",
];

const dummyWinners = [
  "Ranbir Kapoor - Best Actor",
  "Alia Bhatt - Best Actress",
  "RRR - Best Film",
];

// MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9100" },
    background: { default: "#fafafa" },
    success: { main: "#43a047" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
              <Routes>
                <Route path="/" element={<GameScreen />} />
                <Route path="/game" element={<GameScreen />} />
                <Route path="/producers" element={<ProducerList producers={dummyProducers} />} />
                <Route path="/news" element={<NewsFeed news={dummyNews} />} />
                <Route path="/oscars/winners" element={<WinnerReveal winners={dummyWinners} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
