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
  { id: 1, name: "Karan Johar", wealth: 600 },
  { id: 2, name: "Aditya Chopra", wealth: 580 },
];

const dummyNews = [
  { headline: "Karan Johar takes ₹500cr loan from SBI!", date: "2025-06-12" },
  { headline: "Ram Gopal Varma declares bankruptcy 😬", date: "2025-06-11" },
  { headline: "Rohit Shetty launches new movie with AI actors!", date: "2025-06-13" },
];

const dummyWinners = [
  { title: "RRR", producerName: "Rajamouli" },
  { title: "Ranbir Kapoor", producerName: "Best Actor" },
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
                <Route path="/oscars/winners" element={<WinnerReveal nominations={[]} winners={dummyWinners} />} />
                <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
