import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const GameScreen = ({ producers = [], year = 2025, onStart }) => {
  if (producers.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6">No producers available for the year {year}.</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onStart}
          style={{ marginTop: "20px" }}
        >
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Year: {year}</Typography>
      </Grid>
      {producers.map((producer) => (
        <Grid item xs={4} key={producer.id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6">{producer.name}</Typography>
            <Typography variant="body2">
              Wealth: ₹{producer.wealth.toLocaleString()}
            </Typography>
            <Button variant="contained">Take Action</Button>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameScreen;
