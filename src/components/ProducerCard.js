import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider
} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarsIcon from '@mui/icons-material/Stars';
import PeopleIcon from '@mui/icons-material/People';

const ProducerCard = ({ producer, index, isUserProducer }) => {
  // Get producer's most recent movie if any
  const recentMovie = producer.movies.length > 0
    ? producer.movies[producer.movies.length - 1]
    : null;

  return (
    <Card 
      elevation={isUserProducer ? 3 : 1} 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        },
        border: isUserProducer ? '2px solid' : 'none',
        borderColor: 'primary.main',
        position: 'relative'
      }}
    >
      {isUserProducer && (
        <Chip
          label="YOU"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontWeight: 'bold',
            zIndex: 1
          }}
        />
      )}
      
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: producer.color || 'primary.main', mr: 1 }}>
            {producer.name.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div">
            {producer.name}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 1.5 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <MonetizationOnIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
          <Typography variant="body2">
            ₹{producer.wealth.toLocaleString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <StarsIcon sx={{ color: 'warning.main', mr: 1, fontSize: 20 }} />
          <Typography variant="body2">
            Reputation: {producer.reputation}/100
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PeopleIcon sx={{ color: 'info.main', mr: 1, fontSize: 20 }} />
          <Typography variant="body2">
            Fans: {(producer.fans / 1000).toFixed(1)}K
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MovieIcon sx={{ color: 'secondary.main', mr: 1, fontSize: 20 }} />
          <Typography variant="body2">
            Movies: {producer.movies.length}
          </Typography>
        </Box>
        
        {recentMovie && (
          <Box sx={{ mt: 2, pt: 1, borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Latest Release:
            </Typography>
            <Typography variant="body2" noWrap>
              {recentMovie.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Box Office: ₹{recentMovie.boxOffice.toLocaleString()}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProducerCard;
