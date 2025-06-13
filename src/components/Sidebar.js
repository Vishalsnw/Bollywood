import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Movie as MovieIcon, Star as StarIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <List>
        <ListItem button component={Link} to="/producers">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Producers" />
        </ListItem>
        <ListItem button component={Link} to="/news">
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={Link} to="/oscars/winners">
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Oscar Winners" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
