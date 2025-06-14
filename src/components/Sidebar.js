import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { Movie as MovieIcon, Star as StarIcon, AttachMoney as MoneyIcon, Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer 
      anchor="left" 
      open={open} 
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Bollywood Game
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} to="/" onClick={toggleSidebar}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Game Home" />
        </ListItem>
        <ListItem button component={Link} to="/producers" onClick={toggleSidebar}>
          <ListItemIcon>
            <MovieIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Producers" />
        </ListItem>
        <ListItem button component={Link} to="/news" onClick={toggleSidebar}>
          <ListItemIcon>
            <StarIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={Link} to="/oscars/winners" onClick={toggleSidebar}>
          <ListItemIcon>
            <MoneyIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Oscar Winners" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
