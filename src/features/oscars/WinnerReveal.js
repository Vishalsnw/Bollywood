import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WinnerReveal = ({ nominations, winners }) => {
  const [showWinners, setShowWinners] = useState(false);

  return (
    <div>
      <h1>Oscar Nominations</h1>
      <ul>
        {nominations.map((nom, index) => (
          <li key={index}>{nom.title} by {nom.producerName}</li>
        ))}
      </ul>
      <button onClick={() => setShowWinners(true)}>Reveal Winners</button>
      {showWinners && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Oscar Winners</h1>
          <ul>
            {winners.map((win, index) => (
              <li key={index}>{win.title} by {win.producerName}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default WinnerReveal;
