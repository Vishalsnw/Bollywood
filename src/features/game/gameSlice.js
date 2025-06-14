import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the game
const initialState = {
  loading: false,
  error: null,
  currentUser: {
    username: "Vishalsnw",
    id: "user1",
  },
  gameTime: {
    year: 2025,
    month: 6,
    day: 14,
    hour: 16,
    minute: 12,
    second: 37,
  },
  studios: [
    {
      id: "studio1",
      name: "Dharma Productions",
      quality: 85,
      fee: 25000000,
      rentedBy: [],
      description: "A prestigious studio known for high-quality productions and strong industry connections."
    },
    {
      id: "studio2",
      name: "Yash Raj Films",
      quality: 90,
      fee: 30000000,
      rentedBy: [],
      description: "One of the oldest and most respected studios in Bollywood with state-of-the-art facilities."
    },
    {
      id: "studio3",
      name: "Excel Entertainment",
      quality: 75,
      fee: 18000000,
      rentedBy: [],
      description: "A modern studio known for innovative filmmaking and youth-oriented content."
    },
    {
      id: "studio4",
      name: "Red Chillies Entertainment",
      quality: 80,
      fee: 22000000,
      rentedBy: [],
      description: "A well-equipped studio with excellent VFX capabilities and technical infrastructure."
    },
    {
      id: "studio5",
      name: "Aamir Khan Productions",
      quality: 88,
      fee: 28000000,
      rentedBy: [],
      description: "Known for producing critically acclaimed films with high production values."
    }
  ],
  actors: [
    {
      id: "actor1",
      name: "Shah Rukh Khan",
      specialty: "Romance & Drama",
      fame: 95,
      fee: 40000000,
      genres: ["Romance", "Drama", "Action"],
      bio: "Known as the King of Bollywood, Shah Rukh Khan is one of the most successful actors in Indian cinema history.",
      awards: [
        { name: "Filmfare Best Actor", year: 2024 },
        { name: "IIFA Outstanding Achievement", year: 2023 }
      ]
    },
    {
      id: "actor2",
      name: "Deepika Padukone",
      specialty: "Versatile Performer",
      fame: 90,
      fee: 35000000,
      genres: ["Drama", "Historical", "Romance"],
      bio: "One of the highest-paid actresses in India, known for her versatile performances across genres.",
      awards: [
        { name: "Filmfare Best Actress", year: 2024 }
      ]
    },
    {
      id: "actor3",
      name: "Ranbir Kapoor",
      specialty: "Character Actor",
      fame: 85,
      fee: 30000000,
      genres: ["Drama", "Romance", "Coming of Age"],
      bio: "Known for his natural acting ability and portrayal of complex characters.",
      awards: [
        { name: "Filmfare Critics Award", year: 2023 }
      ]
    },
    {
      id: "actor4",
      name: "Alia Bhatt",
      specialty: "Emotional Performances",
      fame: 88,
      fee: 32000000,
      genres: ["Drama", "Thriller", "Comedy"],
      bio: "Renowned for her emotional depth and range as an actress despite her young age.",
      awards: [
        { name: "National Film Award", year: 2024 }
      ]
    },
    {
      id: "actor5",
      name: "Ranveer Singh",
      specialty: "Energy & Charisma",
      fame: 87,
      fee: 33000000,
      genres: ["Action", "Historical", "Comedy"],
      bio: "Known for his boundless energy, charisma and ability to transform into diverse characters.",
      awards: [
        { name: "Filmfare Best Actor", year: 2023 }
      ]
    }
  ],
  directors: [
    {
      id: "director1",
      name: "Karan Johar",
      skill: 85,
      fee: 20000000,
      specialty: "Family Dramas & Romance"
    },
    {
      id: "director2",
      name: "Sanjay Leela Bhansali",
      skill: 92,
      fee: 25000000,
      specialty: "Period Dramas & Visually Rich Films"
    },
    {
      id: "director3",
      name: "Zoya Akhtar",
      skill: 88,
      fee: 18000000,
      specialty: "Coming of Age & Urban Stories"
    },
    {
      id: "director4",
      name: "Rohit Shetty",
      skill: 78,
      fee: 15000000,
      specialty: "Action & Comedy"
    },
    {
      id: "director5",
      name: "Anurag Kashyap",
      skill: 90,
      fee: 16000000,
      specialty: "Dark Themes & Gritty Realism"
    }
  ],
  marketTrends: [
    { genre: "Action", popularity: 85, growth: 5 },
    { genre: "Romance", popularity: 70, growth: -2 },
    { genre: "Comedy", popularity: 75, growth: 3 },
    { genre: "Drama", popularity: 65, growth: 0 },
    { genre: "Thriller", popularity: 60, growth: 8 },
    { genre: "Historical", popularity: 50, growth: -5 },
    { genre: "Fantasy", popularity: 40, growth: 12 }
  ],
  inflation: 4.5,
  producers: [
    {
      id: "producer1",
      name: "Vishal Productions",
      wealth: 500000000,
      reputation: 75,
      fans: 800000,
      color: "#1976d2",
      movies: [
        {
          id: "movie1",
          title: "Love in Mumbai",
          genre: "Romance",
          budget: 80000000,
          boxOffice: 180000000,
          profit: 100000000,
          audienceScore: 82,
          year: 2024,
          month: 10,
          producerId: "producer1",
          producerName: "Vishal Productions",
          actorId: "actor2",
          actorName: "Deepika Padukone",
          actorFee: 35000000,
          directorId: "director1",
          directorName: "Karan Johar",
          directorFee: 20000000,
          studioId: "studio1",
          studioName: "Dharma Productions",
          studioFee: 25000000
        }
      ]
    },
    {
      id: "producer2",
      name: "Red Films",
      wealth: 650000000,
      reputation: 85,
      fans: 1200000,
      color: "#d32f2f",
      movies: [
        {
          id: "movie2",
          title: "City Lights",
          genre: "Drama",
          budget: 100000000,
          boxOffice: 250000000,
          profit: 150000000,
          audienceScore: 88,
          year: 2024,
          month: 8,
          producerId: "producer2",
          producerName: "Red Films",
          actorId: "actor1",
          actorName: "Shah Rukh Khan",
          actorFee: 40000000,
          directorId: "director2",
          directorName: "Sanjay Leela Bhansali",
          directorFee: 25000000,
          studioId: "studio2",
          studioName: "Yash Raj Films",
          studioFee: 30000000
        }
      ]
    },
    {
      id: "producer3",
      name: "Golden Pictures",
      wealth: 420000000,
      reputation: 70,
      fans: 600000,
      color: "#ff9800",
      movies: [
        {
          id: "movie3",
          title: "Desert Storm",
          genre: "Action",
          budget: 120000000,
          boxOffice: 200000000,
          profit: 80000000,
          audienceScore: 75,
          year: 2025,
          month: 2,
          producerId: "producer3",
          producerName: "Golden Pictures",
          actorId: "actor5",
          actorName: "Ranveer Singh",
          actorFee: 33000000,
          directorId: "director4",
          directorName: "Rohit Shetty",
          directorFee: 15000000,
          studioId: "studio3",
          studioName: "Excel Entertainment",
          studioFee: 18000000
        }
      ]
    }
  ],
  userSelectedProducer: "producer1",
  gamePhase: "production", // production, oscars, results
  newsItems: [
    { id: "news1", text: "Action films continue to dominate the box office this quarter.", timestamp: "2025-06-10" },
    { id: "news2", text: "Industry insiders predict a rise in thriller productions next year.", timestamp: "2025-06-12" },
    { id: "news3", text: "Shah Rukh Khan signs a three-film deal worth ₹150 crore.", timestamp: "2025-06-13" },
    { id: "news4", text: "Dharma Productions announces expansion of their studio facilities.", timestamp: "2025-06-14" }
  ],
  nominations: [], // Populated during oscars phase
  oscarWinner: null // Set during results phase
};

// Async thunk for creating a movie (simulating API call)
export const createMovie = createAsyncThunk(
  "game/createMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // Simulating a delay for creating a movie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate box office and audience score based on various factors
      const audienceScore = Math.min(
        Math.floor(Math.random() * 40) + 60, // Base score between 60-99
        99
      );
      
      const boxOfficeMultiplier = (
        (audienceScore / 100) * 2 + // Audience score factor
        Math.random() + 0.5 // Random factor
      );
      
      const boxOffice = Math.floor(movieData.budget * boxOfficeMultiplier);
      const profit = boxOffice - movieData.budget;
      
      return {
        ...movieData,
        id: `movie${Date.now()}`,
        boxOffice,
        profit,
        audienceScore,
        awards: []
      };
    } catch (error) {
      return rejectWithValue("Failed to create movie");
    }
  }
);

// Game slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    advanceMonth: (state) => {
      // Advance month, and year if needed
      state.gameTime.month += 1;
      if (state.gameTime.month > 12) {
        state.gameTime.month = 1;
        state.gameTime.year += 1;
      }
      
      // Update market trends slightly
      state.marketTrends = state.marketTrends.map(trend => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return {
          ...trend,
          popularity: Math.max(10, Math.min(100, trend.popularity + change)),
          growth: Math.floor(Math.random() * 15) - 7 // -7 to +7
        };
      });
      
      // Add a news item
      const newsTexts = [
        `${state.actors[Math.floor(Math.random() * state.actors.length)].name} wins Best Actor award at Mumbai Film Festival.`,
        `Box office numbers down ${Math.floor(Math.random() * 10) + 5}% this month due to summer heat.`,
        `Streaming platforms offering record deals to Bollywood producers.`,
        `New tax incentives announced for film productions in Maharashtra.`,
        `${state.marketTrends.sort((a, b) => b.popularity - a.popularity)[0].genre} films seeing unprecedented audience growth.`
      ];
      
      state.newsItems.unshift({
        id: `news${Date.now()}`,
        text: newsTexts[Math.floor(Math.random() * newsTexts.length)],
        timestamp: `${state.gameTime.year}-${state.gameTime.month.toString().padStart(2, '0')}-${Math.floor(Math.random() * 28) + 1}`
      });
      
      if (state.newsItems.length > 10) {
        state.newsItems = state.newsItems.slice(0, 10);
      }
    },
    
    advanceYear: (state) => {
      state.gameTime.year += 1;
      state.gameTime.month = 1;
      state.gamePhase = "production";
      state.nominations = [];
      state.oscarWinner = null;
      
      // Update market trends significantly
      state.marketTrends = state.marketTrends.map(trend => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return {
          ...trend,
          popularity: Math.max(10, Math.min(100, trend.popularity + change)),
          growth: Math.floor(Math.random() * 25) - 12 // -12 to +12
        };
      });
      
      // Update inflation
      state.inflation = Math.max(1, Math.min(10, state.inflation + (Math.random() * 2 - 1)));
      
      // Reset studio rentals
      state.studios = state.studios.map(studio => ({
        ...studio,
        rentedBy: []
      }));
    },
    
    startOscarNominations: (state) => {
      state.gamePhase = "oscars";
      
      // Get all movies from the previous year
      const eligibleMovies = state.producers
        .flatMap(producer => producer.movies)
        .filter(movie => movie.year === state.gameTime.year - 1);
      
      // Sort by audience score and select top 5
      const sortedMovies = [...eligibleMovies].sort((a, b) => b.audienceScore - a.audienceScore);
      state.nominations = sortedMovies.slice(0, 5);
    },
    
    revealOscarWinner: (state) => {
      state.gamePhase = "results";
      
      if (state.nominations.length > 0) {
        // Select winner (weighted by audience score)
        const totalScore = state.nominations.reduce((sum, movie) => sum + movie.audienceScore, 0);
        let random = Math.random() * totalScore;
        let winner = state.nominations[0]; // Default to first nominee
        
        for (const movie of state.nominations) {
          random -= movie.audienceScore;
          if (random <= 0) {
            winner = movie;
            break;
          }
        }
        
        state.oscarWinner = winner;
        
        // Add award to the movie
        const producerIndex = state.producers.findIndex(p => p.id === winner.producerId);
        if (producerIndex >= 0) {
          const movieIndex = state.producers[producerIndex].movies.findIndex(m => m.id === winner.id);
          if (movieIndex >= 0) {
            if (!state.producers[producerIndex].movies[movieIndex].awards) {
              state.producers[producerIndex].movies[movieIndex].awards = [];
            }
            state.producers[producerIndex].movies[movieIndex].awards.push({
              name: "Best Picture Oscar",
              year: state.gameTime.year
            });
          }
          
          // Reward the producer
          state.producers[producerIndex].wealth += 200000000; // Oscar prize money
          state.producers[producerIndex].reputation += 15; // Reputation boost
          state.producers[producerIndex].fans += 500000; // Fan boost
        }
      }
    },
    
    rentStudio: (state, action) => {
      const { studioId, producerId } = action.payload;
      
      const studioIndex = state.studios.findIndex(s => s.id === studioId);
      const producerIndex = state.producers.findIndex(p => p.id === producerId);
      
      if (studioIndex >= 0 && producerIndex >= 0) {
        const studio = state.studios[studioIndex];
        const producer = state.producers[producerIndex];
        
        // Check if producer can afford it
        if (producer.wealth >= studio.fee) {
          // Add producer to studio's rentedBy array
          if (!studio.rentedBy.includes(producerId)) {
            state.studios[studioIndex].rentedBy.push(producerId);
          }
          
          // Deduct fee from producer
          state.producers[producerIndex].wealth -= studio.fee;
        }
      }
    },
    
    signActor: (state, action) => {
      const { actorId, producerId } = action.payload;
      
      const actorIndex = state.actors.findIndex(a => a.id === actorId);
      const producerIndex = state.producers.findIndex(p => p.id === producerId);
      
      if (actorIndex >= 0 && producerIndex >= 0) {
        const actor = state.actors[actorIndex];
        const producer = state.producers[producerIndex];
        
        // Check if producer can afford it
        if (producer.wealth >= actor.fee) {
          // Deduct fee from producer
          state.producers[producerIndex].wealth -= actor.fee;
          
          // Increase producer reputation slightly
          state.producers[producerIndex].reputation = Math.min(100, producer.reputation + 2);
          
          // Increase producer fans based on actor fame
          const fanIncrease = Math.floor(actor.fame * 1000);
          state.producers[producerIndex].fans += fanIncrease;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        
        // Find the producer
        const producerIndex = state.producers.findIndex(p => p.id === action.payload.producerId);
        
        if (producerIndex >= 0) {
          // Add movie to producer's movies
          state.producers[producerIndex].movies.push(action.payload);
          
          // Deduct budget from producer's wealth
          state.producers[producerIndex].wealth -= action.payload.budget;
          
          // Add profit to producer's wealth (if movie is released immediately for demo purposes)
          state.producers[producerIndex].wealth += action.payload.profit;
          
          // Update producer reputation based on movie success
          const reputationChange = action.payload.profit > 0 
            ? Math.floor(action.payload.audienceScore / 10) 
            : -Math.floor((100 - action.payload.audienceScore) / 10);
            
          state.producers[producerIndex].reputation = Math.max(
            1, Math.min(100, state.producers[producerIndex].reputation + reputationChange)
          );
          
          // Update fans based on movie success
          const fanChange = action.payload.profit > 0
            ? action.payload.audienceScore * 1000
            : -((100 - action.payload.audienceScore) * 200);
            
          state.producers[producerIndex].fans = Math.max(
            0, state.producers[producerIndex].fans + fanChange
          );
        }
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  advanceMonth, 
  advanceYear, 
  startOscarNominations, 
  revealOscarWinner,
  rentStudio,
  signActor
} = gameSlice.actions;

export default gameSlice.reducer;
