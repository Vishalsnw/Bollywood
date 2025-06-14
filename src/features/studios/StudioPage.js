import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  Chip
} from "@mui/material";
import { useGameContext } from "../../context/GameContext";

const StudioPage = () => {
  const { studios, rentStudio, userSelectedProducer, producers } = useGameContext();
  
  // Get user's producer
  const userProducer = producers.find(p => p.id === userSelectedProducer);
  
  // Check if user's producer has rented a studio
  const hasRentedStudio = studios.some(studio => 
    studio.rentedBy && studio.rentedBy.includes(userSelectedProducer)
  );
  
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Film Studios
        </Typography>
        <Typography variant="body1">
          Rent a film studio to improve the production quality of your movies. 
          Better studios increase audience scores and box office performance.
        </Typography>
        
        {userProducer && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', color: 'white', borderRadius: 2 }}>
            <Typography variant="subtitle1">
              Your Available Funds: ₹{userProducer.wealth.toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Grid container spacing={3}>
        {studios.map((studio) => {
          const isRented = studio.rentedBy && studio.rentedBy.includes(userSelectedProducer);
          const canRent = userProducer && userProducer.wealth >= studio.fee && !hasRentedStudio;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={studio.id}>
              <Card 
                elevation={isRented ? 3 : 1}
                sx={{ 
                  height: '100%',
                  border: isRented ? '2px solid' : 'none',
                  borderColor: 'primary.main'
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {studio.name}
                    {isRented && (
                      <Chip 
                        label="RENTED" 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      Quality Rating: {studio.quality}/100
                    </Typography>
                    <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 8, borderRadius: 5 }}>
                      <Box 
                        sx={{ 
                          width: `${studio.quality}%`, 
                          bgcolor: studio.quality > 75 ? 'success.main' : 
                                  studio.quality > 50 ? 'warning.main' : 'error.main',
                          height: '100%',
                          borderRadius: 5
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Rental Fee: ₹{studio.fee.toLocaleString()} per year
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {studio.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Benefits:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip size="small" label={`+${Math.round(studio.quality / 10)}% Audience Score`} />
                      <Chip size="small" label={`+${Math.round(studio.quality / 20)}% Box Office`} />
                      {studio.quality > 70 && (
                        <Chip size="small" label="Prestige Boost" />
                      )}
                    </Box>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button 
                    variant={isRented ? "outlined" : "contained"}
                    color={isRented ? "secondary" : "primary"}
                    fullWidth
                    onClick={() => rentStudio(studio.id, userSelectedProducer)}
                    disabled={isRented || !canRent || !userSelectedProducer}
                  >
                    {isRented ? "Currently Rented" : `Rent for ₹${studio.fee.toLocaleString()}`}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {!userSelectedProducer && (
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'warning.light' }}>
          <Typography variant="h6">
            You need to select a producer first to rent a studio.
          </Typography>
        </Paper>
      )}
      
      {hasRentedStudio && (
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.light' }}>
          <Typography variant="h6">
            You have already rented a studio for this year.
          </Typography>
          <Typography variant="body2">
            You can rent a different studio next year.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default StudioPage;
