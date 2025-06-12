// src/features/movies/MovieList.js

import React from "react";
import { Card, CardContent, Typography, Box, Grid, Chip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function MovieList({ movies, oscarWinnerId }) {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} key={movie.id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                border: movie.id === oscarWinnerId ? "2px solid #fbc02d" : "none",
                background: movie.id === oscarWinnerId ? "#fffde7" : "#fff",
              }}
            >
              <CardContent>
                <Typography variant="h6" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Producer: {movie.producerName}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <MonetizationOnIcon sx={{ color: "#388e3c", mr: 0.5 }} fontSize="small" />
                  <Typography variant="body2">
                    Budget: ₹{movie.budget.toLocaleString()} | Earnings: ₹{movie.earnings.toLocaleString()}
                  </Typography>
                </Box>
                {movie.id === oscarWinnerId && (
                  <Chip
                    icon={<EmojiEventsIcon sx={{ color: "#fbc02d" }} />}
                    label="Oscar Winner"
                    color="warning"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// end of code
