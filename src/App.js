import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme, Box, IconButton, AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

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

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 2, m: 2 }}>
          <Typography variant="h5" gutterBottom>Something went wrong</Typography>
          <Typography variant="body1" gutterBottom>
            {this.state.error && this.state.error.toString()}
          </Typography>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Component Stack</summary>
            {this.state.errorInfo?.componentStack}
          </details>
          <Box sx={{ mt: 2 }}>
            <Link to="/" onClick={() => window.location.reload()}>
              Reload Application
            </Link>
          </Box>
        </Box>
      );
    }
    return this.props.children;
  }
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [appError, setAppError] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    console.log("App mounted");
    
    // Simulate app initialization and check if store is properly loaded
    try {
      // Check if we can access the store state
      const storeState = store.getState();
      console.log("Initial Redux Store State:", storeState);
      
      // Add a small delay to ensure all components have time to initialize
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error during app initialization:", error);
      setAppError(error.message);
      setIsLoading(false);
    }
  }, []);

  // Get current date from store or use current
  const gameTime = store.getState()?.game?.gameTime || { 
    year: 2025, 
    month: 6, 
    day: 14 
  };

  // Format as: June 14, 2025
  const formattedDate = new Date(
    gameTime.year, 
    gameTime.month - 1, // JS months are 0-indexed
    gameTime.day || 14
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const username = store.getState()?.game?.currentUser?.username || "Vishalsnw";

  // Simple test component for debugging
  const TestComponent = () => (
    <Box sx={{ p: 3, border: '1px dashed grey', borderRadius: 2, m: 2 }}>
      <Typography variant="h4" gutterBottom>Test Component</Typography>
      <Typography variant="body1">
        If you can see this message, basic routing and rendering is working.
        The issue may be in the GameScreen component.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Link to="/producers">Try Producers Page</Link>
      </Box>
    </Box>
  );

  if (appError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 3, backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 2, m: 2 }}>
          <Typography variant="h5" gutterBottom>Application Error</Typography>
          <Typography variant="body1">{appError}</Typography>
          <Box sx={{ mt: 2 }}>
            <Link to="/" onClick={() => window.location.reload()}>
              Reload Application
            </Link>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

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

                  <Typography variant="body2">User: {username}</Typography>
                </Toolbar>
              </AppBar>

              <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading game data...</Typography>
                  </Box>
                ) : (
                  <ErrorBoundary>
                    <Routes>
                      {/* You can temporarily use TestComponent for debugging */}
                      {/* <Route path="/" element={<TestComponent />} /> */}
                      <Route path="/" element={<GameScreen />} />
                      <Route path="/producers" element={<ProducersPage />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/oscars/winners" element={<OscarWinnersPage />} />
                      <Route path="/studios" element={<StudioPage />} />
                      <Route path="/actors" element={<ActorsPage />} />
                      <Route path="/market" element={<MarketPage />} />
                      <Route path="*" element={
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                          <Typography variant="h5" gutterBottom>Page Not Found</Typography>
                          <Link to="/">Return to Game Screen</Link>
                        </Box>
                      } />
                    </Routes>
                  </ErrorBoundary>
                )}
              </Box>
            </Box>
          </Router>
        </GameProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
