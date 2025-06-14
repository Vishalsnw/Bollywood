import { createSlice } from "@reduxjs/toolkit";

const producerNames = [
  "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
  "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
  "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
  "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH", "Sunil"
];
function getInitialProducers() {
  return producerNames.map(name => ({
    id: name,
    name,
    wealth: 1000 + Math.floor(Math.random() * 1000),
    reputation: 50 + Math.floor(Math.random() * 50),
    fans: 1000 + Math.floor(Math.random() * 10000),
    movies: []
  }));
}
const genreList = ["Drama", "Action", "Comedy", "Romance", "Thriller", "Mystery", "Horror", "Family", "Crime"];
function randomMovieTitle() {
  const words = ["Dil", "Pyar", "Dosti", "Hero", "Queen", "King", "Sapna", "Andaz", "Badshah", "Masti", "Party", "Magic"];
  return words[Math.floor(Math.random() * words.length)] + " " + Math.floor(Math.random() * 1000);
}
function randomGenre() {
  return genreList[Math.floor(Math.random() * genreList.length)];
}
function randomGrowth() {
  return Math.floor(Math.random() * 11) - 5;
}
function getInitialMarketTrends() {
  return genreList.map(g => ({
    genre: g,
    popularity: 30 + Math.floor(Math.random() * 50),
    growth: randomGrowth()
  }));
}

const initialState = {
  year: 2025,
  month: 1,
  producers: getInitialProducers(),
  marketTrends: getInitialMarketTrends(),
  inflation: 5.0,
  newsItems: [{ text: "Welcome to Bollywood Tycoon All Bots Edition!" }],
  nominations: [],
  oscarWinner: null,
  gamePhase: "idle" // idle, production, oscars, results
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    advanceMonth: (state) => {
      if (state.month < 12) {
        state.producers = state.producers.map(p => {
          const genre = randomGenre();
          const budget = 200 + Math.floor(Math.random() * 800);
          const boxOffice = budget + Math.floor(Math.random() * 1200);
          const profit = boxOffice - budget;
          const title = randomMovieTitle();
          return {
            ...p,
            movies: [
              ...(p.movies || []),
              {
                id: title + state.year + state.month,
                title,
                genre,
                budget,
                boxOffice,
                profit,
                producerName: p.name,
                year: state.year,
                month: state.month,
                audienceScore: 50 + Math.floor(Math.random() * 50),
                awards: []
              }
            ],
            wealth: p.wealth + profit,
            fans: p.fans + Math.floor(Math.random() * 1000),
            reputation: Math.min(100, p.reputation + Math.floor(Math.random() * 3))
          };
        });
        if (state.month === 11) {
          state.newsItems.unshift({ text: "Oscars are coming soon! Producers are finalizing their best movies." });
        } else {
          state.newsItems.unshift({
            text: `New movies released in ${[
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ][state.month - 1]}!`
          });
        }
        state.month += 1;
      }
    },
    startOscarNominations: (state) => {
      state.gamePhase = "oscars";
      const thisYearMovies = state.producers.flatMap(p => p.movies.filter(m => m.year === state.year));
      state.nominations = [...thisYearMovies].sort((a, b) => b.boxOffice - a.boxOffice).slice(0, 8);
      state.newsItems.unshift({ text: `Oscar nominations announced for year ${state.year}!` });
    },
    revealOscarWinner: (state) => {
      state.gamePhase = "results";
      if (!state.nominations?.length) return;
      const weights = state.nominations.map(n => n.boxOffice);
      const total = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      let idx = 0;
      for (; idx < weights.length; idx++) {
        if (r < weights[idx]) break;
        r -= weights[idx];
      }
      const winner = state.nominations[idx] || state.nominations[0];
      state.oscarWinner = winner;
      const prod = state.producers.find(p => p.name === winner.producerName);
      const mov = prod?.movies.find(m => m.id === winner.id);
      if (mov) {
        mov.awards = mov.awards || [];
        mov.awards.push({ name: "Oscar", year: state.year });
      }
      state.newsItems.unshift({ text: `Oscar Winner for ${state.year}: ${winner.title} (${winner.producerName})!` });
    },
    advanceYear: (state) => {
      state.year += 1;
      state.month = 1;
      state.gamePhase = "production";
      state.nominations = [];
      state.oscarWinner = null;
      state.inflation = +(state.inflation + (Math.random() - 0.5)).toFixed(1);
      state.marketTrends = state.marketTrends.map(trend => ({
        ...trend,
        popularity: Math.max(0, Math.min(100, trend.popularity + randomGrowth())),
        growth: randomGrowth()
      }));
    },
    setGamePhase: (state, action) => {
      state.gamePhase = action.payload;
    }
  }
});

export const {
  advanceMonth,
  advanceYear,
  startOscarNominations,
  revealOscarWinner,
  setGamePhase
} = gameSlice.actions;

export default gameSlice.reducer;
