import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import NewsTicker from "./NewsTicker";

const initialProducers = [
  "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
  "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
  "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
  "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH", "Sunil"
].map((name, id) => ({ id, name, wealth: Math.floor(Math.random() * 500) + 500 }));

const GameScreen = () => {
  const [producers, setProducers] = useState(initialProducers);
  const [year, setYear] = useState(2025);
  const [newsItems, setNewsItems] = useState([
    "New blockbuster movie released",
    "Actor signed for upcoming film",
    "Box office records broken"
  ]);

  // Sort producers by wealth
  const sortedProducers = [...producers].sort((a, b) => b.wealth - a.wealth);

  const playNextYear = () => {
    // Generate new news items
    const newNewsItems = [
      `${year + 1}: ${sortedProducers[0].name} produced a blockbuster hit`,
      `Film by ${sortedProducers[Math.floor(Math.random() * 5)].name} wins award`,
      `${sortedProducers[Math.floor(Math.random() * producers.length)].name} announces new project`
    ];
    setNewsItems(newNewsItems);

    // Update producers' wealth
    const updatedProducers = producers.map((producer) => ({
      ...producer,
      wealth: Math.max(100, producer.wealth + Math.floor(Math.random() * 300) - 50), // Random wealth update with minimum of 100
    }));
    setProducers(updatedProducers);
    setYear(year + 1);
  };

  return (
    <Box sx={{ padding: "20px", mt: 5 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Bollywood Tycoon Game
        </Typography>
        <Typography variant="h5" textAlign="center">
          Year: {year}
        </Typography>
      </Paper>

      <NewsTicker news={newsItems} />
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Top Producers
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={2}>
        {sortedProducers.map((producer, index) => (
          <Grid item xs={12} sm={6} md={4} key={producer.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Paper elevation={2} sx={{ 
                border: "1px solid #ddd", 
                borderRadius: "8px", 
                padding: "16px",
                bgcolor: index < 3 ? 'rgba(255, 215, 0, 0.1)' : 'white' // Highlight top 3
              }}>
                <Typography variant="h6" color={index === 0 ? "primary" : "textPrimary"}>
                  {index + 1}. {producer.name}
                  {index === 0 && " 👑"}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  Wealth: ₹{producer.wealth.toLocaleString()}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      
      <Box textAlign="center" mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={playNextYear}
          size="large"
          sx={{ py: 1.5, px: 4 }}
        >
          Play Next Year
        </Button>
      </Box>
    </Box>
  );
};

export default GameScreen;
