import React, { useState } from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import GameScreen from "./components/GameScreen";
import Sidebar from "./components/Sidebar";
import ProducersPage from "./features/producers/ProducersPage";
import NewsPage from "./features/news/NewsPage";
import OscarWinnersPage from "./features/oscars/OscarWinnersPage";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const producers = [
    "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
    "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
    "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
    "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH", "Sunil"
  ].map((name, id) => ({ id, name, wealth: Math.floor(Math.random() * 500) + 500 }));

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ position: "fixed", top: 10, left: 10, zIndex: 1100 }}>
              <IconButton 
                color="primary" 
                onClick={toggleSidebar}
                size="large"
                edge="start"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<GameScreen producers={producers} />} />
                <Route path="/producers" element={<ProducersPage producers={producers} />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/oscars/winners" element={<OscarWinnersPage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
