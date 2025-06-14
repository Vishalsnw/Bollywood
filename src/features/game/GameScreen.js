import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import store from "./store";
import GameScreen from "./components/GameScreen";
import Sidebar from "./components/Sidebar";
import ProducersPage from "./features/producers/ProducersPage";
import NewsPage from "./features/news/NewsPage";
import OscarWinnersPage from "./features/oscars/OscarWinnersPage";
import StudioPage from "./features/studios/StudioPage";
import ActorsPage from "./features/actors/ActorsPage";
import MarketPage from "./features/market/MarketPage";
import { GameProvider } from "./context/GameContext";

// Mock producers data for initial GameScreen prop
const mockProducers = [
  { id: 1, name: "Producer A", wealth: 1000000 },
  { id: 2, name: "Producer B", wealth: 2200000 },
  { id: 3, name: "Producer C", wealth: 1500000 },
];

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9100" },
    background: { default: "#f5f5f5" },
    success: { main: "#43a047" },
    error: { main: "#d32f2f" },
    info: { main: "#0288d1" },
    warning: { main: "#ed6c02" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, overflow: "hidden" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    console.log("App mounted");
  }, []);

  const currentDate = "2025-06-14 16:33:11";
  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameProvider>
          <Router>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <AppBar position="fixed" color="primary" elevation={0}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={toggleSidebar}
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Bollywood Tycoon
                  </Typography>

                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {formattedDate}
                  </Typography>

                  <Typography variant="body2">User: Vishalsnw</Typography>
                </Toolbar>
              </AppBar>

              <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Routes>
                  {/* Pass mockProducers as prop to GameScreen */}
                  <Route path="/" element={<GameScreen producers={mockProducers} />} />
                  <Route path="/producers" element={<ProducersPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/oscars/winners" element={<OscarWinnersPage />} />
                  <Route path="/studios" element={<StudioPage />} />
                  <Route path="/actors" element={<ActorsPage />} />
                  <Route path="/market" element={<MarketPage />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </GameProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
