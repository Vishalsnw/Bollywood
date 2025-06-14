import React from "react";
import { useGameContext } from "../context/GameContext";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Paper,
} from "@mui/material";

function GameScreen({ producers: fallbackProducers }) {
  const context = useGameContext?.();

  // Check for valid context
  if (!context || !context.producers) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          ⚠️ GameContext not available. Showing fallback data.
        </Typography>
        <ProducerList producers={fallbackProducers || []} />
      </Box>
    );
  }

  const {
    year,
    month,
    producers,
    gamePhase,
    inflation,
    marketTrends,
    newsItems,
    oscarWinner,
    userSelectedProducer,
  } = context;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🎬 Bollywood Tycoon - {month}/{year}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Game Phase: {gamePhase}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              📈 Market Trends
            </Typography>
            {marketTrends?.length > 0 ? (
              marketTrends.map((trend, idx) => (
                <Typography key={idx}>- {trend}</Typography>
              ))
            ) : (
              <Typography color="text.secondary">No market trends</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              📰 News
            </Typography>
            {newsItems?.length > 0 ? (
              newsItems.map((news, idx) => (
                <Typography key={idx}>- {news}</Typography>
              ))
            ) : (
              <Typography color="text.secondary">No news items</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <ProducerList producers={producers} selectedId={userSelectedProducer} />
        </Grid>

        {oscarWinner && (
          <Grid item xs={12}>
            <Card sx={{ bgcolor: "#ffeb3b", p: 2 }}>
              <Typography variant="h6">
                🏆 Oscar Winner: {oscarWinner.name}
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

// Subcomponent for rendering producers
function ProducerList({ producers = [], selectedId }) {
  if (producers.length === 0) {
    return <Typography>No producers available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {producers.map((producer) => (
        <Grid item xs={12} sm={6} md={4} key={producer.id}>
          <Card
            variant={producer.id === selectedId ? "elevation" : "outlined"}
            sx={{
              borderColor:
                producer.id === selectedId ? "primary.main" : "grey.300",
            }}
          >
            <CardContent>
              <Typography variant="h6">{producer.name}</Typography>
              <Typography variant="body2">
                💰 Wealth: ₹{producer.wealth?.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                ⭐ Reputation: {producer.reputation || "N/A"}
              </Typography>
              <Typography variant="body2">
                🎟 Fans: {producer.fans || 0}
              </Typography>
              <Typography variant="body2">
                🎬 Movies: {producer.movies?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameScreen;
