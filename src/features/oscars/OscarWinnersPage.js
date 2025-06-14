import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider, Button, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import WinnerReveal from './WinnerReveal';

const OscarWinnersPage = () => {
  const [showWinners, setShowWinners] = useState(false);
  
  const nominations = [
    {
      id: 1,
      title: "The Mumbai Story",
      producerName: "Golu",
      category: "Best Picture",
      description: "A thrilling drama set in the bustling streets of Mumbai",
      image: "https://source.unsplash.com/random/500x300/?bollywood,movie"
    },
    {
      id: 2,
      title: "Eternal Love",
      producerName: "Amit Bagle",
      category: "Best Picture",
      description: "A timeless romance that spans generations",
      image: "https://source.unsplash.com/random/500x300/?romance,movie"
    },
    {
      id: 3,
      title: "Desert Storm",
      producerName: "Mangesh",
      category: "Best Picture",
      description: "An action-packed adventure in the Rajasthan desert",
      image: "https://source.unsplash.com/random/500x300/?desert,movie"
    },
    {
      id: 4,
      title: "The Last Song",
      producerName: "Vasim",
      category: "Best Picture",
      description: "A musical journey that touches hearts",
      image: "https://source.unsplash.com/random/500x300/?music,movie"
    },
    {
      id: 5,
      title: "Mountain Echoes",
      producerName: "Ajinkya",
      category: "Best Picture",
      description: "A spiritual awakening in the Himalayas",
      image: "https://source.unsplash.com/random/500x300/?mountains,movie"
    }
  ];
  
  const winners = [
    {
      id: 2,
      title: "Eternal Love",
      producerName: "Amit Bagle",
      category: "Best Picture",
      description: "A timeless romance that spans generations",
      image: "https://source.unsplash.com/random/500x300/?romance,movie"
    },
    {
      id: 1,
      title: "The Mumbai Story",
      producerName: "Golu",
      category: "Best Director",
      description: "For exceptional direction bringing Mumbai to life",
      image: "https://source.unsplash.com/random/500x300/?director,movie"
    },
    {
      id: 4,
      title: "The Last Song",
      producerName: "Vasim",
      category: "Best Music",
      description: "For soul-stirring melodies that define a generation",
      image: "https://source.unsplash.com/random/500x300/?music,movie"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          2025 Bollywood Oscar Awards
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Nominations
        </Typography>
        
        <Grid container spacing={3}>
          {nominations.map((nom, index) => (
            <Grid item xs={12} sm={6} md={4} key={nom.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card elevation={2}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={nom.image}
                    alt={nom.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {nom.title}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Producer: {nom.producerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {nom.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      display: 'inline-block', 
                      bgcolor: 'action.hover', 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1,
                      mt: 1
                    }}>
                      Nominated for: {nom.category}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => setShowWinners(true)}
            disabled={showWinners}
          >
            Reveal Winners
          </Button>
        </Box>
        
        {showWinners && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Box sx={{ mt: 6 }}>
              <Typography variant="h4" gutterBottom align="center" color="secondary">
                🏆 And the winners are... 🏆
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={3}>
                {winners.map((winner, index) => (
                  <Grid item xs={12} sm={6} md={4} key={winner.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: index * 0.3 }}
                    >
                      <Card elevation={4} sx={{ bgcolor: 'rgba(255, 215, 0, 0.1)' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={winner.image}
                          alt={winner.title}
                        />
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            {winner.title}
                          </Typography>
                          <Typography variant="subtitle1" color="primary" fontWeight="bold">
                            Producer: {winner.producerName}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {winner.description}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ 
                            display: 'inline-block', 
                            bgcolor: 'secondary.light', 
                            color: 'white',
                            px: 2, 
                            py: 0.5, 
                            borderRadius: 1,
                            mt: 2,
                            fontWeight: 'bold'
                          }}>
                            Winner: {winner.category} 🏆
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
      </Paper>
    </Container>
  );
};

export default OscarWinnersPage;
