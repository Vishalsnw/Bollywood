import React, { useState } from "react";
import { 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Paper, 
  Divider, 
  Stepper, 
  Step, 
  StepLabel, 
  Card, 
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import NewsTicker from "./NewsTicker";
import { useGameContext } from "../context/GameContext";
import ProducerCard from "./ProducerCard";
import MovieForm from "./MovieForm";
import FastForwardIcon from '@mui/icons-material/FastForward';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarsIcon from '@mui/icons-material/Stars';

const GameScreen = () => {
  const { 
    year, 
    month,
    producers, 
    gamePhase, 
    newsItems, 
    nominations,
    oscarWinner,
    advanceYear,
    advanceMonth,
    startOscarNominations,
    revealOscarWinner,
    userSelectedProducer,
    marketTrends,
    inflation
  } = useGameContext();
  
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sort producers by wealth
  const sortedProducers = [...producers].sort((a, b) => b.wealth - a.wealth);
  
  // Get user's producer
  const userProducer = producers.find(p => p.id === userSelectedProducer);
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const steps = ['Production Phase', 'Oscar Nominations', 'Oscar Winner'];
  const activeStep = gamePhase === 'production' ? 0 : gamePhase === 'oscars' ? 1 : 2;
  
  const handleProducerClick = (producer) => {
    if (gamePhase === 'production') {
      setSelectedProducer(producer);
    }
  };
  
  const handleNextPhase = () => {
    if (gamePhase === 'production') {
      startOscarNominations();
    } else if (gamePhase === 'oscars') {
      revealOscarWinner();
    } else {
      advanceYear();
    }
  };
  
  const handleAdvanceMonth = async () => {
    setIsLoading(true);
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    advanceMonth();
    setIsLoading(false);
  };
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Bollywood Tycoon
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5">
              {monthNames[month-1]} {year}
            </Typography>
            
            {gamePhase === 'production' && (
              <Tooltip title="Advance to Next Month">
                <IconButton 
                  color="primary" 
                  onClick={handleAdvanceMonth}
                  disabled={isLoading}
                  sx={{ ml: 1 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : <FastForwardIcon />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '70%' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Chip 
            label={`Inflation: ${inflation.toFixed(1)}%`} 
            color="secondary" 
            variant="outlined"
          />
        </Box>
      </Paper>

      <NewsTicker news={newsItems} />
      
      {userProducer && (
        <Paper elevation={2} sx={{ p: 2, mt: 3, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
          <Typography variant="h6">Your Production Company: {userProducer.name}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MonetizationOnIcon sx={{ mr: 1 }} />
              <Typography>
                Wealth: ₹{userProducer.wealth.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarsIcon sx={{ mr: 1 }} />
              <Typography>
                Reputation: {userProducer.reputation}/100
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography>
                Fans: {(userProducer.fans / 1000).toFixed(1)}K
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              <Typography>
                Movies: {userProducer.movies.length}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 2 }}>
        <Typography variant="h5">
          {gamePhase === 'production' ? 'Production Phase' : 
           gamePhase === 'oscars' ? 'Oscar Nominations' : 
           'Oscar Results'}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleNextPhase}
          disabled={gamePhase === 'production' && month < 12}
        >
          {gamePhase === 'production' 
            ? (month < 12 
                ? `Continue Production (${12-month} months until Oscars)`
                : 'Finalize Productions & Go to Oscars') 
            : gamePhase === 'oscars' 
              ? 'Reveal Oscar Winner' 
              : 'Start Next Year'}
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      {/* Production Phase */}
      {gamePhase === 'production' && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Producers</Typography>
              <Grid container spacing={2}>
                {sortedProducers.map((producer, index) => (
                  <Grid item xs={12} sm={6} md={4} key={producer.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onClick={() => handleProducerClick(producer)}
                    >
                      <ProducerCard 
                        producer={producer} 
                        index={index} 
                        isUserProducer={producer.id === userSelectedProducer}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Market Trends</Typography>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Genre Popularity
                </Typography>
                
                {marketTrends.sort((a, b) => b.popularity - a.popularity).map((trend) => (
                  <Box key={trend.genre} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        {trend.genre}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: trend.growth > 0 ? 'success.main' : 
                               trend.growth < 0 ? 'error.main' : 'text.secondary'
                      }}>
                        {trend.growth > 0 ? '+' : ''}{trend.growth}%
                      </Typography>
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
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Movies in trending genres perform better at the box office.
                </Typography>
              </Paper>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Release Calendar</Typography>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Upcoming releases this month:
                  </Typography>
                  
                  {producers.flatMap(p => p.movies)
                    .filter(m => m.year === year && m.month === month)
                    .length > 0 ? (
                      producers.flatMap(p => p.movies)
                        .filter(m => m.year === year && m.month === month)
                        .map(movie => (
                          <Box key={movie.id} sx={{ mb: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                            <Typography variant="body2">
                              {movie.title} - {movie.producerName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {movie.genre} • Budget: ₹{movie.budget}
                            </Typography>
                          </Box>
                        ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No movies scheduled for release this month.
                      </Typography>
                    )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
          
          {selectedProducer && (
            <MovieForm 
              producer={selectedProducer} 
              onClose={() => setSelectedProducer(null)} 
            />
          )}
        </>
      )}
      
      {/* Oscar Nominations Phase */}
      {gamePhase === 'oscars' && (
        <>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="secondary">
              Oscar Nominations {year}
            </Typography>
            <Typography variant="subtitle1">
              The following films have been nominated for Best Picture
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {nominations.map((nomination, index) => (
              <Grid item xs={12} sm={6} key={nomination.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 215, 0, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      {nomination.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Produced by: {nomination.producerName}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">
                        Budget: ₹{nomination.budget.toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Box Office: ₹{nomination.boxOffice.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">
                        Genre: {nomination.genre}
                      </Typography>
                      <Typography variant="body2">
                        Starring: {nomination.actor}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">
                        Audience Score: {nomination.audienceScore}/100
                      </Typography>
                      <Box 
                        sx={{ 
                          height: 10, 
                          width: '100%', 
                          bgcolor: 'grey.300',
                          borderRadius: 5,
                          mt: 1
                        }}
                      >
                        <Box 
                          sx={{ 
                            height: '100%', 
                            width: `${nomination.audienceScore}%`, 
                            bgcolor: 'primary.main',
                            borderRadius: 5
                          }} 
                        />
                      </Box>
                    </Box>
                    
                    {nomination.awards && nomination.awards.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2">
                          Previous Awards:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {nomination.awards.map((award, i) => (
                            <Chip 
                              key={i} 
                              label={award.name} 
                              size="small" 
                              color="secondary" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      {/* Oscar Results Phase */}
      {gamePhase === 'results' && oscarWinner && (
        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Paper 
              elevation={5} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                bgcolor: 'rgba(255, 215, 0, 0.1)',
                border: '2px solid rgba(255, 215, 0, 0.5)',
                maxWidth: 700,
                mx: 'auto'
              }}
            >
              <Typography 
                variant="h4" 
                color="secondary"
                sx={{ 
                  mb: 2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                🏆 Oscar Winner {year} 🏆
              </Typography>
              
              <Typography variant="h3" gutterBottom>
                "{oscarWinner.title}"
              </Typography>
              
              <Typography variant="h5" color="primary" gutterBottom>
                Produced by {oscarWinner.producerName}
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6">Movie Details</Typography>
                <Divider sx={{ my: 1 }} />
                <Grid container spacing={2} sx={{ textAlign: 'left' }}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Genre:</strong> {oscarWinner.genre}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Starring:</strong> {oscarWinner.actor}
                    </Typography>
                  </Grid>
                  {oscarWinner.director && (
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Director:</strong> {oscarWinner.director}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Budget:</strong> ₹{oscarWinner.budget.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Box Office:</strong> ₹{oscarWinner.boxOffice.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Profit:</strong> ₹{oscarWinner.profit.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Audience Score: {oscarWinner.audienceScore}/100
                </Typography>
                <Box 
                  sx={{ 
                    height: 15, 
                    width: '100%', 
                    bgcolor: 'grey.300',
                    borderRadius: 5
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${oscarWinner.audienceScore}%`, 
                      bgcolor: 'secondary.main',
                      borderRadius: 5
                    }} 
                  />
                </Box>
              </Box>
              
              <Typography variant="h6" sx={{ mt: 4, fontStyle: 'italic' }}>
                Congratulations to {oscarWinner.producerName} on this prestigious achievement!
              </Typography>
              
              <Box sx={{ mt: 4, mb: 1 }}>
                <Typography variant="body2">
                  This award comes with a ₹200 cash prize and a significant boost to reputation and fan following.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default GameScreen;
