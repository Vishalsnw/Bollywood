import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const NewsTicker = ({ news = [] }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [news]);
  
  return (
    <Paper elevation={1} sx={{ 
      p: 1.5, 
      borderRadius: 2, 
      bgcolor: 'primary.light', 
      color: 'white',
      overflow: 'hidden'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
          BREAKING NEWS:
        </Typography>
        <Box sx={{ overflow: 'hidden', width: '100%' }}>
          <motion.div
            key={currentNewsIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="body1">
              {news[currentNewsIndex]}
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewsTicker;
