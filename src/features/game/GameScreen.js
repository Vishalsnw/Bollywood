import React, { useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const GameScreen = ({ producers }) => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [updatedProducers, setUpdatedProducers] = useState(producers);

  const playNextYear = () => {
    const nextYearProducers = updatedProducers.map((producer) => ({
      ...producer,
      wealth: producer.wealth + Math.floor(Math.random() * 200) - 50, // Random wealth update
    }));
    setUpdatedProducers(nextYearProducers);
    setCurrentYear((prevYear) => prevYear + 1);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center">
        Year: {currentYear}
      </Typography>
      <Grid container spacing={2}>
        {updatedProducers.map((producer) => (
          <Grid item xs={12} sm={6} md={4} key={producer.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
                <Typography variant="h6">{producer.name}</Typography>
                <Typography variant="body2">Wealth: ₹{producer.wealth.toLocaleString()}</Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={playNextYear}>
          Play Next Year
        </Button>
      </Box>
    </Box>
  );
};

export default GameScreen;
