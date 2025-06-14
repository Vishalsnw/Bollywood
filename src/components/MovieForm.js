import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Slider,
  Typography,
  Box,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useGameContext } from "../context/GameContext";

const MovieForm = ({ producer, onClose }) => {
  const { 
    createMovie, 
    year, 
    month,
    actors,
    directors,
    marketTrends,
    studios
  } = useGameContext();
  
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [budget, setBudget] = useState(50000000);
  const [selectedActor, setSelectedActor] = useState("");
  const [selectedDirector, setSelectedDirector] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  // Calculate max budget based on producer's wealth
  const maxBudget = Math.min(producer.wealth * 0.8, 500000000);
  
  // Calculate estimated costs and returns
  const actorCost = selectedActor ? actors.find(a => a.id === selectedActor)?.fee || 0 : 0;
  const directorCost = selectedDirector ? directors.find(d => d.id === selectedDirector)?.fee || 0 : 0;
  const studioCost = selectedStudio ? studios.find(s => s.id === selectedStudio)?.fee || 0 : 0;
  const productionCost = budget - actorCost - directorCost - studioCost;
  
  // Calculate market trend for selected genre
  const genreTrend = genre 
    ? marketTrends.find(trend => trend.genre === genre)?.popularity || 50 
    : 0;
  
  // Validate form
  const isFormValid = title && genre && budget > 0 && selectedActor && selectedDirector && selectedStudio;
  const isPossible = budget <= producer.wealth;
  
  // Effect to pre-populate fields when opened
  useEffect(() => {
    if (actors.length > 0) {
      setSelectedActor(actors[0].id);
    }
    
    if (directors.length > 0) {
      setSelectedDirector(directors[0].id);
    }
    
    if (studios.length > 0) {
      setSelectedStudio(studios[0].id);
    }
    
    if (marketTrends.length > 0) {
      setGenre(marketTrends[0].genre);
    }
  }, [actors, directors, studios, marketTrends]);
  
  const handleCreateMovie = async () => {
    if (!isFormValid || !isPossible) return;
    
    setIsCreating(true);
    
    // Get actor, director and studio objects
    const actor = actors.find(a => a.id === selectedActor);
    const director = directors.find(d => d.id === selectedDirector);
    const studio = studios.find(s => s.id === selectedStudio);
    
    // Create movie object
    const movie = {
      title,
      genre,
      budget,
      actorId: selectedActor,
      actorName: actor.name,
      actorFee: actor.fee,
      directorId: selectedDirector,
      directorName: director.name,
      directorFee: director.fee,
      studioId: selectedStudio,
      studioName: studio.name,
      studioFee: studio.fee,
      producerId: producer.id,
      producerName: producer.name,
      year,
      month
    };
    
    // Submit to game context
    await createMovie(movie);
    
    // Close the modal
    setIsCreating(false);
    onClose();
  };
  
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Create a New Movie with {producer.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Movie Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                label="Genre"
              >
                {marketTrends.map((trend) => (
                  <MenuItem key={trend.genre} value={trend.genre}>
                    {trend.genre} ({trend.popularity}% popularity)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography gutterBottom>
                Budget: ₹{budget.toLocaleString()}
              </Typography>
              <Slider
                value={budget}
                onChange={(e, newValue) => setBudget(newValue)}
                min={10000000}
                max={maxBudget}
                step={5000000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                disabled={isCreating}
              />
              <Typography variant="caption" color="text.secondary">
                Min: ₹10M | Max: ₹{(maxBudget/1000000).toFixed(0)}M (80% of your wealth)
              </Typography>
            </Box>
            
            {!isPossible && (
              <Typography color="error" sx={{ mt: 1 }}>
                You don't have enough money for this budget!
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="actor-label">Lead Actor</InputLabel>
              <Select
                labelId="actor-label"
                value={selectedActor}
                onChange={(e) => setSelectedActor(e.target.value)}
                label="Lead Actor"
              >
                {actors.map((actor) => (
                  <MenuItem key={actor.id} value={actor.id}>
                    {actor.name} - ₹{actor.fee.toLocaleString()} - Fame: {actor.fame}/100
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="director-label">Director</InputLabel>
              <Select
                labelId="director-label"
                value={selectedDirector}
                onChange={(e) => setSelectedDirector(e.target.value)}
                label="Director"
              >
                {directors.map((director) => (
                  <MenuItem key={director.id} value={director.id}>
                    {director.name} - ₹{director.fee.toLocaleString()} - Skill: {director.skill}/100
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="studio-label">Studio</InputLabel>
              <Select
                labelId="studio-label"
                value={selectedStudio}
                onChange={(e) => setSelectedStudio(e.target.value)}
                label="Studio"
              >
                {studios.map((studio) => (
                  <MenuItem key={studio.id} value={studio.id}>
                    {studio.name} - ₹{studio.fee.toLocaleString()} - Quality: {studio.quality}/100
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                Budget Breakdown
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Actor Fee:
                  </Typography>
                  <Typography variant="body1">
                    ₹{actorCost.toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Director Fee:
                  </Typography>
                  <Typography variant="body1">
                    ₹{directorCost.toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Studio Fee:
                  </Typography>
                  <Typography variant="body1">
                    ₹{studioCost.toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Production Cost:
                  </Typography>
                  <Typography variant="body1">
                    ₹{productionCost.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Market Trend for {genre}:
                </Typography>
                
                <Box sx={{ 
                  width: 100, 
                  height: 10, 
                  bgcolor: 'grey.300', 
                  borderRadius: 5,
                  mr: 1
                }}>
                  <Box sx={{ 
                    width: `${genreTrend}%`, 
                    height: '100%', 
                    bgcolor: genreTrend > 70 ? 'success.main' : genreTrend > 40 ? 'warning.main' : 'error.main',
                    borderRadius: 5
                  }} />
                </Box>
                
                <Typography variant="body2" color={
                  genreTrend > 70 ? 'success.main' : 
                  genreTrend > 40 ? 'warning.main' : 
                  'error.main'
                }>
                  {genreTrend}%
                </Typography>
                
                <Tooltip title="Movies in trending genres perform better at the box office">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button 
          onClick={handleCreateMovie} 
          variant="contained"
          color="primary"
          disabled={!isFormValid || !isPossible || isCreating}
        >
          {isCreating ? <CircularProgress size={24} /> : 'Create Movie'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieForm;
