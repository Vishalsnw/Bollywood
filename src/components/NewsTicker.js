import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const NewsTicker = ({ news }) => {
  return (
    <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
      {news.map((headline, index) => (
        <motion.div
          key={index}
          initial={{ x: 300 }}
          animate={{ x: -300 }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Typography variant="h6">{headline.text}</Typography>
        </motion.div>
      ))}
    </Box>
  );
};

export default NewsTicker;