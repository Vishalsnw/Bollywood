import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useGameContext } from "../../context/GameContext";
import MovieIcon from '@mui/icons-material/Movie';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarsIcon from '@mui/icons-material/Stars';
import PeopleIcon from '@mui/icons-material/People';

const ProducersPage = () => {
  const { producers, userSelectedProducer } = useGameContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Sort producers by wealth
  const sortedProducers = [...producers].sort((a, b) => b.wealth - a.wealth);
  
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
          Bollywood Producers
        </Typography>
        <Typography variant="body1">
          View details about all production companies in the industry, their financial status, and filmography.
        </Typography>
      </Paper>
      
      <Grid container spacing={4}>
        {sortedProducers.map((producer, index) => (
          <Grid item xs={12} key={producer.id}>
            <Card 
              elevation={producer.id === userSelectedProducer ? 3 : 1}
              sx={{ 
                borderRadius: 2,
                border: producer.id === userSelectedProducer ? '2px solid' : 'none',
                borderColor: 'primary.main'
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: producer.color || 'primary.main', 
                          width: 60, 
                          height: 60,
                          mr: 2
                        }}
                      >
                        {producer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h5">
                          {producer.name}
                        </Typography>
                        {producer.id === userSelectedProducer && (
                          <Chip label="YOUR COMPANY" color="primary" size="small" sx={{ mt: 0.5 }} />
                        )}
                      </Box>
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MonetizationOnIcon sx={{ color: 'success.main', mr: 1 }} />
                        <Typography variant="body1">
                          Wealth: ₹{producer.wealth.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <StarsIcon sx={{ color: 'warning.main', mr: 1 }} />
                        <Typography variant="body1">
                          Reputation: {producer.reputation}/100
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PeopleIcon sx={{ color: 'info.main', mr: 1 }} />
                        <Typography variant="body1">
                          Fans: {(producer.fans / 1000).toFixed(1)}K
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MovieIcon sx={{ color: 'secondary.main', mr: 1 }} />
                        <Typography variant="body1">
                          Movies Produced: {producer.movies.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      Filmography
                    </Typography>
                    
                    {producer.movies.length > 0 ? (
                      <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell>Genre</TableCell>
                              <TableCell>Year</TableCell>
                              <TableCell align="right">Budget</TableCell>
                              <TableCell align="right">Box Office</TableCell>
                              <TableCell align="right">Profit</TableCell>
                              <TableCell align="right">Score</TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {producer.movies.map((movie) => (
                              <TableRow key={movie.id}>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.genre}</TableCell>
                                <TableCell>{movie.year}</TableCell>
                                <TableCell align="right">₹{(movie.budget / 1000000).toFixed(1)}M</TableCell>
                                <TableCell align="right">₹{(movie.boxOffice / 1000000).toFixed(1)}M</TableCell>
                                <TableCell 
                                  align="right"
                                  sx={{ 
                                    color: movie.profit > 0 ? 'success.main' : 'error.main'
                                  }}
                                >
                                  {movie.profit > 0 ? '+' : ''}₹{(movie.profit / 1000000).toFixed(1)}M
                                </TableCell>
                                <TableCell align="right">{movie.audienceScore}/100</TableCell>
                                <TableCell align="right">
                                  <Button 
                                    size="small" 
                                    onClick={() => handleMovieClick(movie)}
                                  >
                                    Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No movies produced yet.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
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

export default ProducersPage;
