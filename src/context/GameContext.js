import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  advanceMonth, 
  advanceYear, 
  startOscarNominations, 
  revealOscarWinner, 
  createMovie,
  rentStudio,
  signActor
} from "../features/game/gameSlice";

// Create context
const GameContext = createContext();

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

// Provider component
export const GameProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    currentUser,
    gameTime,
    studios,
    actors,
    directors,
    marketTrends,
    inflation,
    producers,
    userSelectedProducer,
    gamePhase,
    newsItems,
    nominations,
    oscarWinner
  } = useSelector(state => state.game);

  // Extract year and month from gameTime
  const { year, month } = gameTime;

  // Handle advancing to the next month
  const handleAdvanceMonth = () => {
    dispatch(advanceMonth());
  };

  // Handle advancing to the next year
  const handleAdvanceYear = () => {
    dispatch(advanceYear());
  };

  // Handle starting Oscar nominations
  const handleStartOscarNominations = () => {
    dispatch(startOscarNominations());
  };

  // Handle revealing Oscar winner
  const handleRevealOscarWinner = () => {
    dispatch(revealOscarWinner());
  };

  // Handle movie creation
  const handleCreateMovie = async (movieData) => {
    await dispatch(createMovie(movieData));
  };

  // Handle studio rental
  const handleRentStudio = (studioId, producerId) => {
    dispatch(rentStudio({ studioId, producerId }));
  };

  // Handle actor signing
  const handleSignActor = (actorId, producerId) => {
    dispatch(signActor({ actorId, producerId }));
  };

  // Value object to be provided to consumers
  const value = {
    loading,
    error,
    currentUser,
    year,
    month,
    studios,
    actors,
    directors,
    marketTrends,
    inflation,
    producers,
    userSelectedProducer,
    gamePhase,
    newsItems,
    nominations,
    oscarWinner,
    advanceMonth: handleAdvanceMonth,
    advanceYear: handleAdvanceYear,
    startOscarNominations: handleStartOscarNominations,
    revealOscarWinner: handleRevealOscarWinner,
    createMovie: handleCreateMovie,
    rentStudio: handleRentStudio,
    signActor: handleSignActor
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
