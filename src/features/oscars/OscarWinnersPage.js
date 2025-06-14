import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar
} from "@mui/material";
import { useGameContext } from "../../context/GameContext";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const OscarWinnersPage = () => {
  const { producers, year } = useGameContext();
  
  // Get all movies with Oscar awards
  const oscarWinners = producers
    .flatMap(producer => producer.movies)
    .filter(movie => movie.awards && movie.awards.some(award => award.name.includes("Oscar")))
    .sort((a, b) => {
      // Find the Oscar award year for each movie
      const aYear = a.awards.find(award => award.name.includes("Oscar"))?.year || 0;
      const bYear = b.awards.find(award => award.name.includes("Oscar"))?.year || 0;
      return bYear - aYear; // Sort by most recent first
    });
  
  // Placeholder data if no real winners exist
  const placeholderWinners = [
    {
      id: "placeholder1",
      title: "The Golden Era",
      producerName: "Vishal Productions",
      year: 2024,
      genre: "Historical Drama",
      boxOffice: 350000000,
      budget: 120000000,
      profit: 230000000,
      audienceScore: 92,
      actorName: "Shah Rukh Khan",
      directorName: "Karan Johar"
    },
    {
      id: "placeholder2",
      title: "Eternal Love",
      producerName: "Red Films",
      year: 2023,
      genre: "Romance",
      boxOffice: 280000000,
      budget: 90000000,
      profit: 190000000,
      audienceScore: 88,
      actorName: "Deepika Padukone",
      directorName: "Sanjay Leela Bhansali"
    },
    {
      id: "placeholder3",
      title: "Mumbai Nights",
      producerName: "Golden Pictures",
      year: 2022,
      genre: "Thriller",
      boxOffice: 220000000,
      budget: 85000000,
      profit: 135000000,
      audienceScore: 84,
      actorName: "Ranbir Kapoor",
      directorName: "Anurag Kashyap"
    }
  ];
  
  // Use real winners if available, otherwise use placeholders
  const displayWinners = oscarWinners.length > 0 ? oscarWinners : placeholderWinners;
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Oscar Winners Hall of Fame
        </Typography>
        <Typography variant="body1">
          Celebrating the best of Bollywood cinema throughout the years. These films have been recognized with the prestigious Best Picture Oscar award.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {displayWinners.map((movie, index) => (
          <Grid item xs={12} key={movie.id}>
            <Card 
              elevation={3}
              sx={{ 
                borderRadius: 2,
                bgcolor: 'rgba(255, 215, 0, 0.05)',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40, mr: 2 }} />
                  <Typography variant="h5">
                    {movie.title}
                  </Typography>
                  <Chip 
                    label={`${movie.year ? movie.year : year - index - 1} Winner`}
                    color="secondary"
                    sx={{ ml: 2 }}
                  />
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        Produced by {movie.producerName}
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            Genre:
                          </Typography>
                          <Typography variant="body1">
                            {movie.genre}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            Lead Actor:
                          </Typography>
                          <Typography variant="body1">
                            {movie.actorName}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            Director:
                          </Typography>
                          <Typography variant="body1">
                            {movie.directorName}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            Audience Score:
                          </Typography>
                          <Typography variant="body1">
                            {movie.audienceScore}/100
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Critical Acclaim
                      </Typography>
                      <Typography variant="body2">
                        {movie.title} captivated audiences with its {movie.genre.toLowerCase()} storytelling, 
                        stunning visuals, and powerful performances. The film's cultural impact and artistic 
                        merit made it the standout choice for the year's highest honor.
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'background.default',
                        height: '100%'
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        Box Office Performance
                      </Typography>
                      
                      <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Budget:
                        </Typography>
                        <Typography variant="h6">
                          ₹{movie.budget.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Box Office:
                        </Typography>
                        <Typography variant="h6">
                          ₹{movie.boxOffice.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Profit:
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          ₹{movie.profit.toLocaleString()}
                        </Typography>
                        <Typography variant="caption">
                          ({Math.round((movie.profit / movie.budget) * 100)}% ROI)
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OscarWinnersPage;
