import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, ListSubheader } from '@mui/material';
import { 
  Movie as MovieIcon, 
  Star as StarIcon, 
  AttachMoney as MoneyIcon, 
  Home as HomeIcon,
  EmojiEvents as AwardIcon,
  Person as ActorIcon,
  Business as StudioIcon,
  TrendingUp as MarketIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const Sidebar = ({ open, toggleSidebar }) => {
  const { year, quarter, gamePhase } = useGameContext();
  
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
          backgroundImage: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Bollywood Tycoon
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Year: {year} • Quarter: {quarter} • {gamePhase === 'production' ? 'Production Phase' : 
          gamePhase === 'oscars' ? 'Oscar Nominations' : 'Results Phase'}
        </Typography>
      </Box>
      
      <List>
        <ListItem button component={Link} to="/" onClick={toggleSidebar}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Game Dashboard" />
        </ListItem>
        
        <Divider sx={{ my: 1 }} />
        <ListSubheader>Industry</ListSubheader>
        
        <ListItem button component={Link} to="/producers" onClick={toggleSidebar}>
          <ListItemIcon>
            <MovieIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Producers" />
        </ListItem>
        
        <ListItem button component={Link} to="/studios" onClick={toggleSidebar}>
          <ListItemIcon>
            <StudioIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Studios" />
        </ListItem>
        
        <ListItem button component={Link} to="/actors" onClick={toggleSidebar}>
          <ListItemIcon>
            <ActorIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Actors & Directors" />
        </ListItem>
        
        <Divider sx={{ my: 1 }} />
        <ListSubheader>Business</ListSubheader>
        
        <ListItem button component={Link} to="/market" onClick={toggleSidebar}>
          <ListItemIcon>
            <MarketIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Market Trends" />
        </ListItem>
        
        <ListItem button component={Link} to="/news" onClick={toggleSidebar}>
          <ListItemIcon>
            <StarIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Industry News" />
        </ListItem>
        
        <Divider sx={{ my: 1 }} />
        <ListSubheader>Awards</ListSubheader>
        
        <ListItem button component={Link} to="/oscars/winners" onClick={toggleSidebar}>
          <ListItemIcon>
            <AwardIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Oscar Winners" />
        </ListItem>
      </List>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        p: 2, 
        borderTop: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(25, 118, 210, 0.04)'
      }}>
        <Typography variant="caption" display="block" color="text.secondary">
          Developed by Vishalsnw
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          v1.2.0 • Last Updated: 2025-06-14
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
