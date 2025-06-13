import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { ArrowUpward as UpIcon, ArrowDownward as DownIcon } from '@mui/icons-material';

const ProducerRank = ({ producers, previousRanks }) => {
  return (
    <List>
      {producers.map((producer, index) => {
        const previousRank = previousRanks[producer.id];
        const rankChange = previousRank ? previousRank - (index + 1) : 0;

        return (
          <ListItem key={producer.id}>
            <ListItemIcon>
              {rankChange > 0 ? <UpIcon color="success" /> : rankChange < 0 ? <DownIcon color="error" /> : null}
            </ListItemIcon>
            <ListItemText
              primary={`${index + 1}. ${producer.name}`}
              secondary={`Wealth: ₹${producer.wealth.toLocaleString()}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ProducerRank;