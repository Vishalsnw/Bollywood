import React, { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  advanceMonth, 
  advanceYear, 
  startOscarNominations, 
  revealOscarWinner,
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
    oscarWinner
  } = useSelector(state => state.game);

  const handleAdvanceMonth = () => dispatch(advanceMonth());
  const handleAdvanceYear = () => dispatch(advanceYear());
  const handleStartOscarNominations = () => dispatch(startOscarNominations());
  const handleRevealOscarWinner = () => dispatch(revealOscarWinner());
  const handleSignActor = (actorId, producerId) => dispatch(signActor({ actorId, producerId }));

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
    signActor: handleSignActor
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
