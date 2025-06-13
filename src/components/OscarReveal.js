import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Button, Box } from '@mui/material';

const OscarReveal = ({ nominations, winners }) => {
  const [showWinners, setShowWinners] = useState(false);

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h4">Oscar Nominations</Typography>
        <ul>
          {nominations.map(nom => (
            <li key={nom.id}>{nom.title} by {nom.producerName}</li>
          ))}
        </ul>
      </motion.div>
      <Button variant="contained" onClick={() => setShowWinners(true)}>Reveal Winners</Button>
      {showWinners && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4">Oscar Winners</Typography>
          <ul>
            {winners.map(win => (
              <li key={win.id}>{win.title} by {win.producerName}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </Box>
  );
};

export default OscarReveal;