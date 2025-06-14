import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  ButtonGroup,
  Divider
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const ProducersPage = ({ producers: initialProducers = [] }) => {
  const [producers, setProducers] = useState(initialProducers);
  const [sortOrder, setSortOrder] = useState('wealth-desc');

  useEffect(() => {
    // Sort producers based on current sort order
    sortProducers(sortOrder);
  }, []);

  const sortProducers = (order) => {
    let sortedList = [...producers];
    
    switch(order) {
      case 'wealth-desc':
        sortedList.sort((a, b) => b.wealth - a.wealth);
        break;
      case 'wealth-asc':
        sortedList.sort((a, b) => a.wealth - b.wealth);
        break;
      case 'name-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedList.sort((a, b) => b.wealth - a.wealth);
    }
    
    setProducers(sortedList);
    setSortOrder(order);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Producers Rankings
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Sort by:
          </Typography>
          <ButtonGroup variant="outlined" aria-label="sorting options">
            <Button 
              onClick={() => sortProducers('wealth-desc')} 
              variant={sortOrder === 'wealth-desc' ? 'contained' : 'outlined'}
              endIcon={<ArrowDownward />}
            >
              Wealth High-Low
            </Button>
            <Button 
              onClick={() => sortProducers('wealth-asc')} 
              variant={sortOrder === 'wealth-asc' ? 'contained' : 'outlined'}
              endIcon={<ArrowUpward />}
            >
              Wealth Low-High
            </Button>
            <Button 
              onClick={() => sortProducers('name-asc')} 
              variant={sortOrder === 'name-asc' ? 'contained' : 'outlined'}
            >
              Name A-Z
            </Button>
            <Button 
              onClick={() => sortProducers('name-desc')} 
              variant={sortOrder === 'name-desc' ? 'contained' : 'outlined'}
            >
              Name Z-A
            </Button>
          </ButtonGroup>
        </Box>

        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Producer Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Wealth (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {producers.map((producer, index) => (
                <TableRow 
                  key={producer.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                    bgcolor: index < 3 ? 'rgba(255, 215, 0, 0.1)' : undefined // Highlight top 3
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}{index === 0 && " 👑"}
                  </TableCell>
                  <TableCell>{producer.name}</TableCell>
                  <TableCell align="right">{producer.wealth.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProducersPage;
