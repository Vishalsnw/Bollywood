import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useGameContext } from "../../context/GameContext";

const MarketPage = () => {
  const { 
    marketTrends, 
    inflation, 
    producers, 
    userSelectedProducer,
    year,
    month
  } = useGameContext();
  
  const [tabValue, setTabValue] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Get user's producer
  const userProducer = producers.find(p => p.id === userSelectedProducer);
  
  // Get all released movies, sorted by release date (newest first)
  const allMovies = producers
    .flatMap(producer => producer.movies)
    .filter(movie => movie.year <= year && movie.month <= month) // Only released movies
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  
  // Get top grossing movies
  const topGrossingMovies = [...allMovies]
    .sort((a, b) => b.boxOffice - a.boxOffice)
    .slice(0, 10);
  
  // Get user's movies
  const userMovies = userProducer 
    ? userProducer.movies.filter(movie => movie.year <= year && movie.month <= month)
    : [];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  
  const handleCloseDialog = () => {
    setSelectedMovie(null);
  };
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bollywood Market
        </Typography>
        <Typography variant="body1">
          Track market trends, analyze box office performance, and monitor genre popularity.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Top Grossing" />
              <Tab label="Latest Releases" />
              {userProducer && <Tab label="Your Movies" />}
            </Tabs>
            
            <Box sx={{ p: 2 }}>
              {tabValue === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Top Grossing Movies
                  </Typography>
                  <List>
                    {topGrossingMovies.map((movie, index) => (
                      <ListItem 
                        key={movie.id}
                        divider={index < topGrossingMovies.length - 1}
                        button
                        onClick={() => handleMovieClick(movie)}
                      >
                        <ListItemIcon>
                          <Typography variant="h6" color="text.secondary">
                            #{index + 1}
                          </Typography>
                        </ListItemIcon>
                        <ListItemText 
                          primary={movie.title}
                          secondary={`${movie.producerName} • ${movie.genre}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationOnIcon color="success" sx={{ mr: 1 }} />
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            ₹{movie.boxOffice.toLocaleString()}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              
              {tabValue === 1 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Latest Releases
                  </Typography>
                  <List>
                    {allMovies.slice(0, 10).map((movie, index) => (
                      <ListItem 
                        key={movie.id}
                        divider={index < Math.min(allMovies.length, 10) - 1}
                        button
                        onClick={() => handleMovieClick(movie)}
                      >
                        <ListItemIcon>
                          <LocalMoviesIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary={movie.title}
                          secondary={`${movie.producerName} • Released: Year ${movie.year}, Month ${movie.month}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Box Office:
                          </Typography>
                          <Typography variant="body1">
                            ₹{movie.boxOffice.toLocaleString()}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              
              {tabValue === 2 && userProducer && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Your Movies
                  </Typography>
                  {userMovies.length > 0 ? (
                    <List>
                      {userMovies.map((movie, index) => (
                        <ListItem 
                          key={movie.id}
                          divider={index < userMovies.length - 1}
                          button
                          onClick={() => handleMovieClick(movie)}
                        >
                          <ListItemIcon>
                            <MovieIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={movie.title}
                            secondary={`${movie.genre} • Released: Year ${movie.year}, Month ${movie.month}`}
                          />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Budget: ₹{movie.budget.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: movie.profit > 0 ? 'success.main' : 'error.main' }}>
                              {movie.profit > 0 ? '+' : ''}₹{movie.profit.toLocaleString()}
                            </Typography>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                      You haven't released any movies yet.
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Trends
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Year: {year}
                </Typography>
                <Chip 
                  label={`Inflation: ${inflation.toFixed(1)}%`} 
                  color="secondary" 
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Genre Popularity
              </Typography>
              
              {marketTrends.sort((a, b) => b.popularity - a.popularity).map((trend) => (
                <Box key={trend.genre} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">
                      {trend.genre}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {trend.growth > 0 ? (
                        <TrendingUpIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                      ) : trend.growth < 0 ? (
                        <TrendingDownIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
                      ) : null}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: trend.growth > 0 ? 'success.main' : 
                                 trend.growth < 0 ? 'error.main' : 'text.secondary'
                        }}
                      >
                        {trend.growth > 0 ? '+' : ''}{trend.growth}%
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 8, borderRadius: 5 }}>
                    <Box 
                      sx={{ 
                        width: `${trend.popularity}%`, 
                        bgcolor: trend.popularity > 70 ? 'success.main' : 
                                 trend.popularity > 40 ? 'warning.main' : 'error.main',
                        height: '100%',
                        borderRadius: 5
                      }} 
                    />
                  </Box>
                </Box>
              ))}
              
              <Tooltip title="Movies in trending genres perform better at the box office">
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <InfoIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="caption" color="text.secondary">
                    Trends change each year based on audience preferences
                  </Typography>
                </Box>
              </Tooltip>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Statistics
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Total Movies Released" 
                    secondary={allMovies.length}
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemText 
                    primary="Average Box Office" 
                    secondary={`₹${Math.round(allMovies.reduce((sum, movie) => sum + movie.boxOffice, 0) / allMovies.length).toLocaleString()}`}
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemText 
                    primary="Top Performing Genre" 
                    secondary={marketTrends.sort((a, b) => b.popularity - a.popularity)[0]?.genre || "N/A"}
                  />
                </ListItem>
                <Divider component="li" />
                
                <ListItem>
                  <ListItemText 
                    primary="Current Market Leader" 
                    secondary={producers.sort((a, b) => b.wealth - a.wealth)[0]?.name || "N/A"}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Movie Details Dialog */}
      <Dialog open={!!selectedMovie} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedMovie && (
          <>
            <DialogTitle>
              {selectedMovie.title}
            </DialogTitle>
            
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Producer: {selectedMovie.producerName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Released: Year {selectedMovie.year}, Month {selectedMovie.month}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Genre: {selectedMovie.genre}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Starring: {selectedMovie.actorName}
                  </Typography>
                  {selectedMovie.directorName && (
                    <Typography variant="body1" gutterBottom>
                      Director: {selectedMovie.directorName}
                    </Typography>
                  )}
                  <Typography variant="body1" gutterBottom>
                    Studio: {selectedMovie.studioName || "Standard Studio"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Financial Performance
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Budget:
                    </Typography>
                    <Typography variant="h6">
                      ₹{selectedMovie.budget.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Box Office:
                    </Typography>
                    <Typography variant="h6">
                      ₹{selectedMovie.boxOffice.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Profit/Loss:
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: selectedMovie.profit > 0 ? 'success.main' : 'error.main'
                      }}
                    >
                      {selectedMovie.profit > 0 ? '+' : ''}₹{selectedMovie.profit.toLocaleString()}
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        ({Math.round((selectedMovie.profit / selectedMovie.budget) * 100)}% ROI)
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Audience Score: {selectedMovie.audienceScore}/100
                  </Typography>
                  <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 10, borderRadius: 5, mb: 2 }}>
                    <Box 
                      sx={{ 
                        width: `${selectedMovie.audienceScore}%`, 
                        bgcolor: selectedMovie.audienceScore > 70 ? 'success.main' : 
                                selectedMovie.audienceScore > 50 ? 'warning.main' : 'error.main',
                        height: '100%',
                        borderRadius: 5
                      }} 
                    />
                  </Box>
                  
                  {selectedMovie.awards && selectedMovie.awards.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Awards:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedMovie.awards.map((award, index) => (
                          <Chip 
                            key={index} 
                            label={award.name} 
                            color="secondary" 
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MarketPage;
