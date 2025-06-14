import React, { useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const initialProducers = [
  "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
  "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
  "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
  "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH", "Sunil"
].map((name, id) => ({ id, name, wealth: Math.floor(Math.random() * 500) + 500 }));

const GameScreen = () => {
  const [producers, setProducers] = useState(initialProducers);
  const [year, setYear] = useState(2025);

  const playNextYear = () => {
    const updatedProducers = producers.map((producer) => ({
      ...producer,
      wealth: producer.wealth + Math.floor(Math.random() * 200) - 50, // Random wealth update
    }));
    setProducers(updatedProducers);
    setYear(year + 1);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" textAlign="center">
        Year: {year}
      </Typography>
      <Grid container spacing={2}>
        {producers.map((producer) => (
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
