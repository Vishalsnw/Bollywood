import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

const NewsTicker = ({ news }) => {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 1.5, 
        overflow: 'hidden', 
        borderLeft: '4px solid',
        borderColor: 'info.main',
        bgcolor: 'info.light',
        color: 'info.contrastText'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            mr: 2,
            fontWeight: 'bold',
            color: 'info.dark'
          }}
        >
          BOLLYWOOD NEWS:
        </Typography>
        
        <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear"
            }}
            style={{ 
              display: 'flex', 
              whiteSpace: 'nowrap',
              gap: '40px'
            }}
          >
            {news.map((item, index) => (
              <Box 
                key={item.id} 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  '&::after': {
                    content: '"•"',
                    marginLeft: '40px',
                    color: 'info.dark'
                  },
                  '&:last-child::after': {
                    content: '""'
                  }
                }}
              >
                <Typography variant="body2">
                  {item.text}
                </Typography>
              </Box>
            ))}
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
};

export default NewsTicker;
