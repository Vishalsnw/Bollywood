import React from 'react';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const ProducerList = ({ producers = [], previousRanks = {} }) => {
  if (producers.length === 0) {
    return (
      <div>
        <h1>Producers List</h1>
        <p>No producers available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Producers List</h1>
      <ul>
        {producers.map((producer, index) => {
          const previousRank = previousRanks[producer.id];
          const rankChange = previousRank ? previousRank - (index + 1) : 0;

          return (
            <li key={producer.id}>
              {producer.name} - ₹{producer.wealth.toLocaleString()}
              {rankChange > 0 && <ArrowUpward color="success" />}
              {rankChange < 0 && <ArrowDownward color="error" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProducerList;
