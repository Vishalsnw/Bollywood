import React, { useEffect, useRef, useState } from "react";
import {
  Grid, Typography, Button, Box, Paper, Divider, Stepper, Step, StepLabel, Chip
} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from "react-redux";
import { advanceMonth, advanceYear, startOscarNominations, revealOscarWinner } from "../features/game/gameSlice";
import NewsTicker from "./NewsTicker";

export default function GameScreen() {
  const dispatch = useDispatch();
  const {
    year,
    month,
    producers,
    gamePhase,
    inflation,
    marketTrends,
    newsItems,
    nominations,
    oscarWinner
  } = useSelector(state => state.game);

  const [autoRunning, setAutoRunning] = useState(false);
  const [prevRanks, setPrevRanks] = useState({});
  const timerRef = useRef();

  const sortedProducers = [...(producers || [])].sort((a, b) => b.wealth - a.wealth);
  useEffect(() => {
    setPrevRanks(ranks => {
      const next = {};
      sortedProducers.forEach((p, i) => { next[p.id] = (ranks && ranks[p.id] !== undefined) ? ranks[p.id] : i; });
      return next;
    });
    // eslint-disable-next-line
  }, [year]);

  const handleStart = () => {
    if (autoRunning) return;
    setAutoRunning(true);
    timerRef.current = setInterval(() => {
      if (gamePhase === "production" || gamePhase === "idle") {
        if (month < 12) {
          dispatch(advanceMonth());
        } else {
          dispatch(startOscarNominations());
        }
      } else if (gamePhase === "oscars") {
        dispatch(revealOscarWinner());
      } else {
        dispatch(advanceYear());
      }
    }, 2500);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const steps = ['Production Phase', 'Oscar Nominations', 'Oscar Winner'];
  const activeStep = gamePhase === 'production' || gamePhase === 'idle' ? 0 : gamePhase === 'oscars' ? 1 : 2;

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Bollywood Tycoon (All Bots)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5">
              {monthNames[month - 1]} {year}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stepper activeStep={activeStep} sx={{ width: '70%' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Chip label={`Inflation: ${inflation?.toFixed(1)}%`} color="secondary" variant="outlined" />
        </Box>
        {!autoRunning && (
          <Box sx={{ my: 2, textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={handleStart} size="large">
              Start Year
            </Button>
          </Box>
        )}
      </Paper>
      <NewsTicker news={newsItems} />
      <Grid container spacing={2}>
        {/* Producers List */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h6">Producers (Wealth)</Typography>
            {sortedProducers.map((prod, i) => {
              let prevRank = prevRanks[prod.id];
              let arrow = null;
              if (prevRank !== undefined) {
                if (prevRank > i) arrow = <ArrowUpwardIcon color="success" fontSize="small" />;
                else if (prevRank < i) arrow = <ArrowDownwardIcon color="error" fontSize="small" />;
              }
              return (
                <Box key={prod.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ width: 24, fontWeight: "bold" }}>{i + 1}.</Typography>
                  <Typography sx={{ width: 110 }}>{prod.name}</Typography>
                  <Typography sx={{ width: 90 }}>₹{prod.wealth}</Typography>
                  {arrow}
                </Box>
              )
            })}
          </Paper>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" color="secondary" gutterBottom>Oscar Winners</Typography>
            {producers
              .flatMap(p => p.movies)
              .filter(m => m.awards && m.awards.some(a => a.name === "Oscar"))
              .sort((a, b) => b.year - a.year)
              .slice(0, 10)
              .map((w, i) => (
                <Box key={w.id + i} sx={{ mb: 1 }}>
                  <Typography>
                    {w.year}: <b>{w.producerName}</b> <i>({w.title})</i>
                  </Typography>
                </Box>
              ))}
          </Paper>
        </Grid>
        {/* Main Game */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              {gamePhase === 'production' || gamePhase === 'idle' ? "Movie Production Running..." :
                gamePhase === 'oscars' ? "Oscar Nominations Announced!" :
                  gamePhase === 'results' ? "Oscar Winner Announced!" :
                    "Welcome!"}
            </Typography>
            {gamePhase === "oscars" && nominations && nominations.length > 0 && (
              <>
                <Typography variant="h6" color="secondary" sx={{ mt: 2, mb: 1 }}>
                  Oscar Nominations:
                </Typography>
                {nominations.map((movie, i) => (
                  <Box key={movie.id} sx={{ mb: 1, pl: 2 }}>
                    <Typography variant="body2">
                      {i + 1}. <b>{movie.title}</b> ({movie.genre}) - <i>{movie.producerName}</i>
                    </Typography>
                  </Box>
                ))}
              </>
            )}
            {gamePhase === "results" && oscarWinner && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" color="success.main">
                  Oscar Winner: <b>{oscarWinner.title}</b> by <b>{oscarWinner.producerName}</b>
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Market Trends</Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Current Genre Popularity
              </Typography>
              {marketTrends && marketTrends.length > 0 && [...marketTrends].sort((a, b) => b.popularity - a.popularity).map((trend) => (
                <Box key={trend.genre} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">
                      {trend.genre}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: trend.growth > 0 ? 'success.main' :
                        trend.growth < 0 ? 'error.main' : 'text.secondary'
                    }}>
                      {trend.growth > 0 ? '+' : ''}{trend.growth}%
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 8, borderRadius: 5 }}>
                    <Box
                      sx={{
                        width: `${trend.popularity}%`,
                        bgcolor: trend.popularity > 70 ? 'success.main' :
                          trend.popularity > 40 ? 'warning.main' : 'error.main',
                        height: '100%',
                        borderRadius: 5
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
                 }
