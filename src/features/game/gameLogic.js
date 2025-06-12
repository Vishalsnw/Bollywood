// src/features/game/gameLogic.js

// Helper to generate a random integer between min and max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random movie title
function generateMovieTitle(producerName, year) {
  const adjectives = ["Super", "Mega", "Ultimate", "Dhamaka", "Blockbuster", "Dream", "Secret", "Golden"];
  const nouns = ["Journey", "Hero", "Queen", "King", "Saga", "Mystery", "Love", "Star"];
  return `${adjectives[randInt(0, adjectives.length - 1)]} ${nouns[randInt(0, nouns.length - 1)]} (${producerName.split(" ")[0]}) ${year}`;
}

// Main game logic for one year
export function playYear(state) {
  let movies = [];
  let news = [];
  let producers = state.producers.map(p => ({ ...p }));

  // Each producer may produce 1 movie with some random stats
  producers.forEach(producer => {
    if (!producer.isActive) return;
    // Decide if producer releases a movie this year (80% chance)
    if (Math.random() < 0.8) {
      const budget = randInt(50000, 250000); // Random budget
      const earnings = randInt(0, budget * 3); // Random box office
      const movie = {
        id: `${producer.id}-${state.year}`,
        title: generateMovieTitle(producer.name, state.year),
        producerId: producer.id,
        producerName: producer.name,
        year: state.year,
        budget,
        earnings,
      };
      movies.push(movie);
      producer.movies.push(movie);
      producer.wealth += (earnings - budget);
      producer.netWorthHistory.push(producer.wealth);
    } else {
      producer.netWorthHistory.push(producer.wealth);
    }
  });

  // Oscar selection: Top earning movie
  let oscarWinner = null;
  if (movies.length > 0) {
    oscarWinner = movies.reduce((best, curr) => (curr.earnings > best.earnings ? curr : best), movies[0]);
    let winnerProducer = producers.find(p => p.id === oscarWinner.producerId);
    if (winnerProducer) winnerProducer.oscars += 1;
    news.push({
      type: "oscar",
      text: `🏆 Oscar Winner: "${oscarWinner.title}" by ${oscarWinner.producerName} (${oscarWinner.earnings.toLocaleString()} INR)`,
      year: state.year,
    });
  }

  // News: Top flop, top hit, richest producer
  if (movies.length > 0) {
    const topHit = movies.reduce((a, b) => (a.earnings > b.earnings ? a : b));
    const topFlop = movies.reduce((a, b) => (a.earnings < b.earnings ? a : b));
    news.push({
      type: "hit",
      text: `🔥 Blockbuster: "${topHit.title}" earned ${topHit.earnings.toLocaleString()} INR!`,
      year: state.year,
    });
    news.push({
      type: "flop",
      text: `💸 Flop: "${topFlop.title}" earned only ${topFlop.earnings.toLocaleString()} INR.`,
      year: state.year,
    });
  }

  const richest = producers.reduce((a, b) => (a.wealth > b.wealth ? a : b));
  news.push({
    type: "richest",
    text: `💰 Richest Producer: ${richest.name} (${richest.wealth.toLocaleString()} INR)`,
    year: state.year,
  });

  return {
    movies,
    oscars: oscarWinner,
    news,
    producers,
  };
}

// end of code
