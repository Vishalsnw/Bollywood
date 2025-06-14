import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import InfoIcon from '@mui/icons-material/Info';
import { useGameContext } from "../../context/GameContext";

const ActorsPage = () => {
  const { actors, signActor, userSelectedProducer, producers } = useGameContext();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("fame");
  const [selectedActor, setSelectedActor] = useState(null);
  
  // Get user's producer
  const userProducer = producers.find(p => p.id === userSelectedProducer);
  
  // Filter and sort actors
  const filteredActors = actors
    .filter(actor => 
      actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "fame") return b.fame - a.fame;
      if (sortBy === "fee") return a.fee - b.fee;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    
  const handleActorSelect = (actor) => {
    setSelectedActor(actor);
  };
  
  const handleCloseDialog = () => {
    setSelectedActor(null);
  };
  
  const handleSignActor = () => {
    if (selectedActor && userSelectedProducer) {
      signActor(selectedActor.id, userSelectedProducer);
      setSelectedActor(null);
    }
  };
  
  const toggleSort = () => {
    if (sortBy === "fame") setSortBy("fee");
    else if (sortBy === "fee") setSortBy("name");
    else setSortBy("fame");
  };
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bollywood Actors
        </Typography>
        <Typography variant="body1">
          Sign actors for your upcoming films. Higher fame actors bring more audience but cost more.
        </Typography>
        
        {userProducer && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', color: 'white', borderRadius: 2 }}>
            <Typography variant="subtitle1">
              Your Available Funds: ₹{userProducer.wealth.toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Box sx={{ display: 'flex', mb: 3 }}>
        <TextField
          placeholder="Search actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, mr: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Button 
          variant="outlined" 
          startIcon={<SortIcon />}
          onClick={toggleSort}
        >
          Sort by: {sortBy === "fame" ? "Fame" : sortBy === "fee" ? "Fee" : "Name"}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {filteredActors.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card 
              elevation={1}
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                },
                cursor: 'pointer'
              }}
              onClick={() => handleActorSelect(actor)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ width: 60, height: 60, mr: 2 }}
                    alt={actor.name}
                    src={actor.imageUrl || undefined}
                  />
                  <Box>
                    <Typography variant="h6" component="div">
                      {actor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {actor.specialty}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Fame: {actor.fame}/100
                  </Typography>
                  <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 8, borderRadius: 5 }}>
                    <Box 
                      sx={{ 
                        width: `${actor.fame}%`, 
                        bgcolor: actor.fame > 75 ? 'success.main' : 
                                actor.fame > 50 ? 'warning.main' : 'error.main',
                        height: '100%',
                        borderRadius: 5
                      }} 
                    />
                  </Box>
                </Box>
                
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Fee: ₹{actor.fee.toLocaleString()}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {actor.genres.map((genre, index) => (
                    <Chip key={index} label={genre} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {!userSelectedProducer && (
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'warning.light' }}>
          <Typography variant="h6">
            You need to select a producer first to sign actors.
          </Typography>
        </Paper>
      )}
      
      {/* Actor Details Dialog */}
      <Dialog open={!!selectedActor} onClose={handleCloseDialog} maxWidth="md">
        {selectedActor && (
          <>
            <DialogTitle>
              {selectedActor.name}
            </DialogTitle>
            
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Avatar 
                    sx={{ width: '100%', height: 'auto', aspectRatio: '1', mb: 2 }}
                    alt={selectedActor.name}
                    src={selectedActor.imageUrl || undefined}
                  />
                  
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Fee: ₹{selectedActor.fee.toLocaleString()}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Fame: {selectedActor.fame}/100
                    </Typography>
                    <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 10, borderRadius: 5 }}>
                      <Box 
                        sx={{ 
                          width: `${selectedActor.fame}%`, 
                          bgcolor: selectedActor.fame > 75 ? 'success.main' : 
                                  selectedActor.fame > 50 ? 'warning.main' : 'error.main',
                          height: '100%',
                          borderRadius: 5
                        }} 
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <Typography variant="subtitle1" gutterBottom>
                    Specialty: {selectedActor.specialty}
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    {selectedActor.bio || "A talented Bollywood actor known for versatile performances."}
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Best Genre Performances:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedActor.genres.map((genre, index) => (
                        <Chip key={index} label={genre} />
                      ))}
                    </Box>
                  </Box>
                  
                  {selectedActor.awards && selectedActor.awards.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Awards:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedActor.awards.map((award, index) => (
                          <Chip 
                            key={index} 
                            label={award.name} 
                            color="secondary" 
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Impact on Your Movie:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip 
                        icon={<InfoIcon />}
                        label={`+${Math.round(selectedActor.fame / 10)}% Audience Appeal`} 
                      />
                      <Chip 
                        icon={<InfoIcon />}
                        label={`+${Math.round(selectedActor.fame / 5)}% Box Office for ${selectedActor.genres[0]} films`} 
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSignActor}
                disabled={!userSelectedProducer || (userProducer && userProducer.wealth < selectedActor.fee)}
              >
                Sign for ₹{selectedActor.fee.toLocaleString()}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ActorsPage;
