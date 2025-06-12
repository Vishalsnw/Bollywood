// src/components/GameScreen.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGame, playNextYear, resetGame } from "../features/game/gameSlice";
import ProducerList from "../features/producers/ProducerList";
import MovieList from "../features/movies/MovieList";
import NewsFeed from "../features/news/NewsFeed";
import { Box, Button, Typography, Stack } from "@mui/material";

export default function GameScreen() {
  const dispatch = useDispatch();
  const { running, year, producers, movies, oscars, news } = useSelector((state) => state.game);

  const latestOscar = oscars && oscars.length > 0 ? oscars[oscars.length - 1] : null;
  const moviesThisYear = movies.filter((m) => m.year === year - 1);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Bollywood Producer Tycoon
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        {!running ? (
          <Button variant="contained" color="primary" onClick={() => dispatch(startGame())}>
            Start Game
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={() => dispatch(playNextYear())}>
              Next Year
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => dispatch(resetGame())}>
              Reset
            </Button>
          </>
        )}
      </Stack>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Year: {year} {running ? "" : "(Paused)"}
      </Typography>
      <ProducerList producers={producers} />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Movies Released {year > 2025 ? `(Year ${year - 1})` : ""}
      </Typography>
      <MovieList movies={moviesThisYear} oscarWinnerId={latestOscar ? latestOscar.id : null} />
      <NewsFeed news={news} />
    </Box>
  );
}

// end of code
