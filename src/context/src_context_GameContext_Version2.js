import React, { createContext, useState, useContext, useEffect } from 'react';

// Initial producers data with special abilities
const initialProducers = [
  "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
  "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
  "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
  "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH"
].map((name, id) => {
  // Generate random special abilities
  const abilities = [
    "Marketing Genius", "Talent Scout", "Budget Master", 
    "Hitmaker", "Studio Mogul", "International Connect", 
    "Award Magnet", "Script Guru"
  ];
  
  const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
  
  // Generate random preferred genre
  const genres = ['Action', 'Romance', 'Drama', 'Comedy', 'Thriller', 'Horror', 'Family'];
  const preferredGenre = genres[Math.floor(Math.random() * genres.length)];
  
  return {
    id, 
    name, 
    wealth: Math.floor(Math.random() * 500) + 500,
    fans: Math.floor(Math.random() * 100000) + 10000,
    reputation: Math.floor(Math.random() * 70) + 30, // 0-100 scale
    movies: [],
    awards: 0,
    specialAbility: randomAbility,
    preferredGenre: preferredGenre,
    level: 1,
    experience: 0,
    studio: null,
    collaborations: []
  };
});

// Create the context
const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [year, setYear] = useState(2025);
  const [quarter, setQuarter] = useState(1);
  const [producers, setProducers] = useState(initialProducers);
  const [gamePhase, setGamePhase] = useState('production'); // production, oscars, results
  const [newsItems, setNewsItems] = useState([
    "New blockbuster movie released",
    "Actor signed for upcoming film",
    "Box office records broken"
  ]);
  const [nominations, setNominations] = useState([]);
  const [oscarWinner, setOscarWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [marketTrends, setMarketTrends] = useState({
    popularGenres: ['Drama', 'Action'],
    unpopularGenres: ['Horror'],
    inflation: 1.0,
    audiencePreference: 'domestic' // domestic, international, both
  });
  const [randomEvents, setRandomEvents] = useState([]);
  const [availableActors, setAvailableActors] = useState([
    { id: 1, name: "Raj Kumar", popularity: 85, fee: 50, genre: "Action", status: "available", awards: 2 },
    { id: 2, name: "Priya Singh", popularity: 92, fee: 80, genre: "Romance", status: "available", awards: 3 },
    { id: 3, name: "Vikram Kapoor", popularity: 78, fee: 40, genre: "Drama", status: "available", awards: 1 },
    { id: 4, name: "Meera Desai", popularity: 87, fee: 60, genre: "Comedy", status: "available", awards: 2 },
    { id: 5, name: "Arjun Patel", popularity: 81, fee: 45, genre: "Thriller", status: "available", awards: 0 },
    { id: 6, name: "Kiran Joshi", popularity: 75, fee: 35, genre: "Family", status: "available", awards: 1 },
    { id: 7, name: "Neha Sharma", popularity: 89, fee: 65, genre: "Drama", status: "available", awards: 2 },
    { id: 8, name: "Rahul Verma", popularity: 83, fee: 55, genre: "Action", status: "available", awards: 1 }
  ]);
  const [availableDirectors, setAvailableDirectors] = useState([
    { id: 1, name: "Rohit Shetty", skill: 90, fee: 60, style: "Commercial", status: "available" },
    { id: 2, name: "Anurag Kashyap", skill: 85, fee: 50, style: "Indie", status: "available" },
    { id: 3, name: "Zoya Akhtar", skill: 88, fee: 55, style: "Drama", status: "available" },
    { id: 4, name: "Rajkumar Hirani", skill: 92, fee: 70, style: "Comedy", status: "available" },
    { id: 5, name: "Sanjay Leela Bhansali", skill: 91, fee: 75, style: "Period Drama", status: "available" }
  ]);
  const [studios, setStudios] = useState([
    { id: 1, name: "Dharma Productions", level: 3, cost: 150, benefits: { marketingBoost: 15, reputationBoost: 10 }, owner: null },
    { id: 2, name: "Red Chillies Entertainment", level: 3, cost: 140, benefits: { marketingBoost: 12, reputationBoost: 12 }, owner: null },
    { id: 3, name: "Yash Raj Films", level: 4, cost: 200, benefits: { marketingBoost: 20, reputationBoost: 15 }, owner: null },
    { id: 4, name: "Excel Entertainment", level: 2, cost: 100, benefits: { marketingBoost: 8, reputationBoost: 7 }, owner: null },
    { id: 5, name: "T-Series", level: 3, cost: 130, benefits: { marketingBoost: 15, distributionBoost: 10 }, owner: null }
  ]);
  const [festivals, setFestivals] = useState([
    { id: 1, name: "Mumbai Film Festival", prestige: 3, upcoming: true, year: 2025, quarter: 2 },
    { id: 2, name: "International Indian Film Academy Awards", prestige: 4, upcoming: true, year: 2025, quarter: 3 },
    { id: 3, name: "Filmfare Awards", prestige: 5, upcoming: true, year: 2025, quarter: 4 }
  ]);

  // Movie genres and budgets
  const movieGenres = ['Action', 'Romance', 'Drama', 'Comedy', 'Thriller', 'Horror', 'Family'];
  const movieBudgets = [100, 200, 300, 500, 800, 1000, 1500, 2000];
  const movieTypes = [
    { type: "Mainstream", riskFactor: 1.0, description: "Standard commercial movie with moderate risk and return" },
    { type: "Blockbuster", riskFactor: 1.5, description: "High budget, high risk, high potential return" },
    { type: "Indie", riskFactor: 0.7, description: "Low budget, artistic, festival favorite, moderate risk" },
    { type: "Franchise", riskFactor: 0.8, description: "Sequel/prequel to existing movie, lower risk, good return" },
    { type: "Experimental", riskFactor: 2.0, description: "Very high risk, but potential for massive critical acclaim" }
  ];

  // Update market trends each quarter
  useEffect(() => {
    if (randomEvents.length > 0) {
      // Clear random events after they're displayed
      const timer = setTimeout(() => {
        setRandomEvents([]);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [randomEvents]);

  // Function to create a new movie
  const createMovie = (producerId, title, genre, budget, actor, director, movieType) => {
    const producer = producers.find(p => p.id === producerId);
    if (!producer || producer.wealth < budget) return false;
    
    const selectedType = movieType || "Mainstream";
    const typeFactor = movieTypes.find(t => t.type === selectedType)?.riskFactor || 1.0;
    
    // Calculate movie success factors
    const actorFactor = actor ? (actor.popularity / 100) : 0.5;
    const directorFactor = director ? (director.skill / 100) : 0.5;
    const budgetFactor = budget / 1000;
    const reputationFactor = producer.reputation / 100;
    const randomFactor = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
    
    // Apply special abilities
    let abilityBonus = 1.0;
    if (producer.specialAbility === "Marketing Genius") abilityBonus += 0.2;
    if (producer.specialAbility === "Hitmaker") abilityBonus += 0.15;
    if (producer.specialAbility === "Budget Master" && budget >= 800) abilityBonus += 0.25;
    if (producer.specialAbility === "Script Guru") abilityBonus += 0.15;
    
    // Check if preferred genre
    const genreBonus = producer.preferredGenre === genre ? 0.15 : 0;
    
    // Check market trends
    const marketTrendFactor = marketTrends.popularGenres.includes(genre) ? 0.2 : 
                              marketTrends.unpopularGenres.includes(genre) ? -0.15 : 0;
    
    // Studio bonus
    const studioBonus = producer.studio ? 
      studios.find(s => s.id === producer.studio)?.benefits.marketingBoost / 100 || 0 : 0;
    
    const successRate = (actorFactor * 0.3 + 
                         directorFactor * 0.2 + 
                         budgetFactor * 0.15 + 
                         reputationFactor * 0.15 + 
                         randomFactor * 0.1 + 
                         genreBonus + 
                         marketTrendFactor +
                         studioBonus) * 
                         abilityBonus * typeFactor;
    
    // Calculate box office based on success factors and audience preference
    let boxOffice = Math.floor(budget * (successRate * 3) * (Math.random() * 1.5 + 0.5));
    
    // Apply market audience preference
    if (marketTrends.audiencePreference === 'international' && 
        producer.specialAbility === 'International Connect') {
      boxOffice *= 1.3; // 30% bonus for international specialists during int'l trends
    }
    
    // Calculate revenue
    const actorCost = actor ? actor.fee : 0;
    const directorCost = director ? director.fee : 0;
    const totalCost = budget + actorCost + directorCost;
    const profit = boxOffice - totalCost;
    
    // Calculate audience and critical scores
    const audienceScore = Math.min(100, Math.floor(successRate * 100));
    const criticalScore = Math.min(100, Math.floor((successRate * 0.7 + Math.random() * 0.3) * 100));
    
    // Check for flop or blockbuster
    const isFlop = boxOffice < totalCost * 0.8;
    const isBlockbuster = boxOffice > totalCost * 2.5;
    
    const newMovie = {
      id: Date.now(),
      title,
      genre,
      budget,
      type: selectedType,
      actor: actor ? actor.name : "Unknown",
      director: director ? director.name : "Unknown",
      boxOffice,
      profit,
      audienceScore,
      criticalScore,
      year,
      quarter,
      producerId,
      producerName: producer.name,
      isNominated: false,
      isWinner: false,
      isFlop,
      isBlockbuster,
      awards: []
    };
    
    // Update producer wealth and movies
    const updatedProducers = producers.map(p => {
      if (p.id === producerId) {
        // Calculate experience gained (more for successful movies)
        const expGained = profit > 0 ? 10 + Math.floor(profit / 100) : 5;
        let newExp = p.experience + expGained;
        let newLevel = p.level;
        
        // Level up if enough experience
        if (newExp >= p.level * 100) {
          newExp = newExp - (p.level * 100);
          newLevel = p.level + 1;
          
          // Add level up to news
          setNewsItems(prev => [
            `${p.name} has leveled up to Producer Level ${newLevel}!`,
            ...prev.slice(0, 4)
          ]);
        }
        
        const updatedWealth = Math.max(0, p.wealth - budget + profit);
        const updatedReputation = Math.min(100, Math.max(10, 
          p.reputation + (isBlockbuster ? 15 : isFlop ? -8 : profit > 0 ? 5 : -3)));
        const updatedFans = Math.max(1000, 
          p.fans + (isBlockbuster ? 50000 : isFlop ? -10000 : profit > 0 ? Math.floor(profit * 10) : Math.floor(profit * 2)));
        
        return {
          ...p,
          wealth: updatedWealth,
          reputation: updatedReputation,
          fans: updatedFans,
          movies: [...p.movies, newMovie],
          experience: newExp,
          level: newLevel
        };
      }
      return p;
    });
    
    setProducers(updatedProducers);
    
    // Add to news
    let newsType;
    if (isBlockbuster) {
      newsType = `BLOCKBUSTER! "${title}" smashes box office with ₹${boxOffice.toLocaleString()}`;
    } else if (isFlop) {
      newsType = `FLOP! "${title}" disappoints with only ₹${boxOffice.toLocaleString()}`;
    } else if (profit > 0) {
      newsType = `"${title}" performs well with ₹${boxOffice.toLocaleString()}`;
    } else {
      newsType = `"${title}" struggles at box office with ₹${boxOffice.toLocaleString()}`;
    }
    
    setNewsItems(prev => [newsType, ...prev.slice(0, 4)]);
    
    // Maybe trigger a random event
    if (Math.random() < 0.3) { // 30% chance of random event
      triggerRandomEvent(newMovie, producer);
    }
    
    return true;
  };

  // Function to trigger random events
  const triggerRandomEvent = (movie, producer) => {
    const events = [
      {
        type: "scandal",
        title: "Celebrity Scandal!",
        description: `A scandal involving ${movie.actor} has impacted "${movie.title}"'s performance`,
        effect: "reputation",
        value: -5,
        severity: "negative"
      },
      {
        type: "viralTrend",
        title: "Viral Social Media Trend!",
        description: `A scene from "${movie.title}" has gone viral on social media, boosting ticket sales`,
        effect: "boxOffice",
        value: Math.floor(movie.budget * 0.2),
        severity: "positive"
      },
      {
        type: "controversialContent",
        title: "Controversial Content Debate",
        description: `"${movie.title}" has sparked debate over controversial content`,
        effect: "fans",
        value: Math.random() < 0.5 ? 20000 : -20000, // Could go either way
        severity: Math.random() < 0.5 ? "positive" : "negative"
      },
      {
        type: "awardBuzz",
        title: "Award Season Buzz",
        description: `"${movie.title}" is generating early award season buzz`,
        effect: "reputation",
        value: 8,
        severity: "positive"
      },
      {
        type: "internationalSuccess",
        title: "International Market Success",
        description: `"${movie.title}" is performing exceptionally well in international markets`,
        effect: "boxOffice",
        value: Math.floor(movie.budget * 0.3),
        severity: "positive"
      },
      {
        type: "productionDelay",
        title: "Production Delays",
        description: `"${movie.title}" faced production delays, increasing costs`,
        effect: "wealth",
        value: -Math.floor(movie.budget * 0.15),
        severity: "negative"
      }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    // Apply event effects
    const updatedProducers = producers.map(p => {
      if (p.id === producer.id) {
        let updatedProducer = { ...p };
        
        switch(randomEvent.effect) {
          case "reputation":
            updatedProducer.reputation = Math.min(100, Math.max(10, p.reputation + randomEvent.value));
            break;
          case "fans":
            updatedProducer.fans = Math.max(1000, p.fans + randomEvent.value);
            break;
          case "wealth":
            updatedProducer.wealth = Math.max(0, p.wealth + randomEvent.value);
            break;
          case "boxOffice":
            // Find the movie and update its box office
            updatedProducer.movies = p.movies.map(m => {
              if (m.id === movie.id) {
                const newBoxOffice = m.boxOffice + randomEvent.value;
                const newProfit = m.profit + randomEvent.value;
                return { ...m, boxOffice: newBoxOffice, profit: newProfit };
              }
              return m;
            });
            
            // Also update producer's wealth
            updatedProducer.wealth = Math.max(0, p.wealth + randomEvent.value);
            break;
        }
        
        return updatedProducer;
      }
      return p;
    });
    
    setProducers(updatedProducers);
    
    // Add event to random events list
    setRandomEvents(prev => [...prev, randomEvent]);
    
    // Add to news
    setNewsItems(prev => [randomEvent.description, ...prev.slice(0, 4)]);
  };

  // Function to advance to next quarter
  const advanceQuarter = () => {
    const newQuarter = quarter + 1;
    
    if (newQuarter > 4) {
      // If we've completed all 4 quarters, move to Oscar season
      startOscarNominations();
    } else {
      // Otherwise, just advance to next quarter
      setQuarter(newQuarter);
      
      // Update market trends
      updateMarketTrends();
      
      // Process scheduled festivals
      processFestivals(year, newQuarter);
      
      // Generate quarterly news
      const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
      setNewsItems(prev => [
        `${quarterNames[newQuarter-1]} Quarter of ${year} begins!`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  // Function to update market trends
  const updateMarketTrends = () => {
    // Shuffle popular/unpopular genres occasionally
    if (Math.random() < 0.3) { // 30% chance to change trends
      const allGenres = [...movieGenres];
      const shuffled = allGenres.sort(() => 0.5 - Math.random());
      
      const newPopular = shuffled.slice(0, 2);
      const newUnpopular = shuffled.slice(2, 3);
      
      setMarketTrends(prev => ({
        ...prev,
        popularGenres: newPopular,
        unpopularGenres: newUnpopular
      }));
      
      // Add trend change to news
      setNewsItems(prev => [
        `Market trends are shifting! ${newPopular.join(' and ')} films are gaining popularity`,
        ...prev.slice(0, 4)
      ]);
    }
    
    // Update inflation
    const inflationChange = (Math.random() * 0.05) + 0.98; // 0.98-1.03 range
    setMarketTrends(prev => ({
      ...prev,
      inflation: Math.max(1.0, prev.inflation * inflationChange)
    }));
    
    // Occasionally shift audience preference
    if (Math.random() < 0.2) { // 20% chance
      const newPreference = ['domestic', 'international', 'both'][Math.floor(Math.random() * 3)];
      
      setMarketTrends(prev => ({
        ...prev,
        audiencePreference: newPreference
      }));
      
      // Add to news
      if (newPreference !== prev.audiencePreference) {
        setNewsItems(prev => [
          `Audience preferences are shifting toward ${newPreference} markets`,
          ...prev.slice(0, 4)
        ]);
      }
    }
  };

  // Function to process film festivals
  const processFestivals = (currentYear, currentQuarter) => {
    const upcomingFestivals = festivals.filter(
      f => f.upcoming && f.year === currentYear && f.quarter === currentQuarter
    );
    
    if (upcomingFestivals.length > 0) {
      // For each festival, select winners from all movies from the past year
      upcomingFestivals.forEach(festival => {
        // Get all movies from the past year
        const eligibleMovies = producers.flatMap(p => 
          p.movies.filter(m => 
            (m.year === currentYear || 
             (m.year === currentYear - 1 && m.quarter > currentQuarter))
          )
        );
        
        if (eligibleMovies.length > 0) {
          // Sort by critical score and select winner
          const sortedMovies = [...eligibleMovies].sort((a, b) => 
            b.criticalScore - a.criticalScore
          );
          
          const winner = sortedMovies[0];
          const runnerUp = sortedMovies.length > 1 ? sortedMovies[1] : null;
          
          // Update movie with award
          const updatedProducers = producers.map(p => {
            if (p.id === winner.producerId) {
              // Add award to movie
              const updatedMovies = p.movies.map(m => {
                if (m.id === winner.id) {
                  return {
                    ...m,
                    awards: [...m.awards, {
                      name: festival.name,
                      type: "Best Film",
                      prestige: festival.prestige
                    }]
                  };
                }
                return m;
              });
              
              // Update producer reputation and fans
              return {
                ...p,
                movies: updatedMovies,
                reputation: Math.min(100, p.reputation + (festival.prestige * 2)),
                fans: p.fans + (festival.prestige * 10000)
              };
            }
            return p;
          });
          
          setProducers(updatedProducers);
          
          // Add to news
          setNewsItems(prev => [
            `"${winner.title}" by ${winner.producerName} wins at ${festival.name}!`,
            ...prev.slice(0, 4)
          ]);
        }
        
        // Mark festival as completed
        setFestivals(prev => 
          prev.map(f => 
            f.id === festival.id ? { ...f, upcoming: false } : f
          )
        );
      });
    }
    
    // Schedule next year's festivals
    if (currentQuarter === 4) {
      const nextYearFestivals = [
        { id: Date.now() + 1, name: "Mumbai Film Festival", prestige: 3, upcoming: true, year: currentYear + 1, quarter: 2 },
        { id: Date.now() + 2, name: "International Indian Film Academy Awards", prestige: 4, upcoming: true, year: currentYear + 1, quarter: 3 },
        { id: Date.now() + 3, name: "Filmfare Awards", prestige: 5, upcoming: true, year: currentYear + 1, quarter: 4 }
      ];
      
      setFestivals(prev => [...prev.filter(f => !f.upcoming), ...nextYearFestivals]);
    }
  };

  // Function to move to Oscar nominations phase
  const startOscarNominations = () => {
    // Find top movies by audience and critical score
    const allMovies = producers.flatMap(p => p.movies).filter(m => m.year === year);
    
    // Calculate a combined score
    const scoredMovies = allMovies.map(movie => ({
      ...movie,
      combinedScore: (movie.audienceScore * 0.6) + (movie.criticalScore * 0.4)
    }));
    
    // Get top 5 movies
    const topMovies = [...scoredMovies].sort((a, b) => b.combinedScore - a.combinedScore).slice(0, 5);
    
    // Update movies to mark as nominated
    const nominatedMovies = topMovies.map(movie => ({
      ...movie,
      isNominated: true
    }));
    
    setNominations(nominatedMovies);
    
    // Add nomination news
    setNewsItems(prev => [
      `Oscar Nominations announced for the year ${year}!`,
      ...prev.slice(0, 4)
    ]);
    
    // Update game phase
    setGamePhase('oscars');
  };

  // Function to reveal Oscar winner
  const revealOscarWinner = () => {
    if (nominations.length === 0) return;
    
    // Choose the movie with highest combined score
    // (with a small random factor for surprise)
    const scoredNominations = nominations.map(movie => ({
      ...movie,
      finalScore: movie.combinedScore * (Math.random() * 0.2 + 0.9) // 0.9-1.1 random factor
    }));
    
    const winner = [...scoredNominations].sort((a, b) => b.finalScore - a.finalScore)[0];
    const winningMovie = {
      ...winner,
      isWinner: true,
      awards: [...winner.awards, {
        name: "Oscar Awards",
        type: "Best Picture",
        prestige: 10
      }]
    };
    
    setOscarWinner(winningMovie);
    
    // Update producer with award
    const updatedProducers = producers.map(p => {
      if (p.id === winningMovie.producerId) {
        // Update producer's movies to mark the winner
        const updatedMovies = p.movies.map(m => 
          m.id === winningMovie.id ? winningMovie : m
        );
        
        return {
          ...p,
          awards: p.awards + 1,
          reputation: Math.min(100, p.reputation + 20),
          fans: p.fans + 200000,
          wealth: p.wealth + 300, // Oscar bonus
          movies: updatedMovies,
          experience: p.experience + 50 // Big experience boost for Oscar win
        };
      }
      return p;
    });
    
    setProducers(updatedProducers);
    
    // Add winner news
    setNewsItems(prev => [
      `"${winningMovie.title}" by ${winningMovie.producerName} WINS the Oscar for Best Picture ${year}!`,
      ...prev.slice(0, 4)
    ]);
    
    // Update game phase
    setGamePhase('results');
  };

  // Function to advance to next year
  const advanceYear = () => {
    // Save current year to history
    setGameHistory(prev => [...prev, {
      year,
      quarter,
      producers: [...producers],
      oscarWinner,
      marketTrends: { ...marketTrends }
    }]);
    
    // Reset game phase and quarter
    setGamePhase('production');
    setQuarter(1);
    
    // Clear nominations and winner
    setNominations([]);
    setOscarWinner(null);
    
    // Update year
    setYear(prev => prev + 1);
    
    // Update producers (market fluctuations, etc.)
    const updatedProducers = producers.map(producer => {
      const marketFluctuation = Math.floor(Math.random() * 200) - 50;
      const reputationChange = Math.floor(Math.random() * 6) - 2;
      
      return {
        ...producer,
        wealth: Math.max(100, producer.wealth + marketFluctuation),
        reputation: Math.max(10, Math.min(100, producer.reputation + reputationChange)),
        fans: Math.max(1000, producer.fans + Math.floor(Math.random() * 5000) - 1000)
      };
    });
    
    setProducers(updatedProducers);
    
    // Reset market trends for new year
    updateMarketTrends();
    
    // Generate new industry news
    const topProducer = [...updatedProducers].sort((a, b) => b.wealth - a.wealth)[0];
    const newNewsItems = [
      `Welcome to ${year + 1}! ${topProducer.name} starts the year as the richest producer with ₹${topProducer.wealth.toLocaleString()}`,
      `Industry analysts predict ${marketTrends.popularGenres.join(' and ')} films will trend this year`,
      `${updatedProducers[Math.floor(Math.random() * updatedProducers.length)].name} plans ambitious new project`
    ];
    
    setNewsItems(newNewsItems);
    
    // Refresh available actors and directors
    refreshTalent();
  };

  // Function to refresh actors and directors
  const refreshTalent = () => {
    // Update existing actors
    const updatedActors = availableActors.map(actor => ({
      ...actor,
      popularity: Math.min(99, Math.max(50, actor.popularity + Math.floor(Math.random() * 10) - 3)),
      fee: Math.max(10, Math.floor(actor.fee * marketTrends.inflation * (Math.random() * 0.2 + 0.9))),
      status: Math.random() < 0.8 ? "available" : "unavailable" // 20% chance to be unavailable
    }));
    
    // Add 1-2 new actors
    const newActorCount = Math.floor(Math.random() * 2) + 1;
    const newActors = [];
    
    for (let i = 0; i < newActorCount; i++) {
      const actorNames = ["Aditya Kapoor", "Nisha Patel", "Siddharth Malhotra", "Deepika Shah", 
                         "Karan Singh", "Ananya Desai", "Rohan Mehra", "Kavita Joshi"];
      const newName = actorNames[Math.floor(Math.random() * actorNames.length)];
      const newGenre = movieGenres[Math.floor(Math.random() * movieGenres.length)];
      
      newActors.push({
        id: Date.now() + i,
        name: newName,
        popularity: Math.floor(Math.random() * 30) + 60, // 60-90 range
        fee: Math.floor(Math.random() * 40) + 30, // 30-70 range
        genre: newGenre,
        status: "available",
        awards: 0
      });
    }
    
    setAvailableActors([...updatedActors, ...newActors]);
    
    // Update directors similarly
    const updatedDirectors = availableDirectors.map(director => ({
      ...director,
      skill: Math.min(99, Math.max(60, director.skill + Math.floor(Math.random() * 8) - 2)),
      fee: Math.max(20, Math.floor(director.fee * marketTrends.inflation * (Math.random() * 0.2 + 0.9))),
      status: Math.random() < 0.8 ? "available" : "unavailable"
    }));
    
    setAvailableDirectors(updatedDirectors);
  };

  // Function to purchase a studio
  const purchaseStudio = (producerId, studioId) => {
    const producer = producers.find(p => p.id === producerId);
    const studio = studios.find(s => s.id === studioId);
    
    if (!producer || !studio || producer.wealth < studio.cost || studio.owner !== null) {
      return false;
    }
    
    // Update producer
    const updatedProducers = producers.map(p => {
      if (p.id === producerId) {
        return {
          ...p,
          wealth: p.wealth - studio.cost,
          studio: studioId
        };
      }
      return p;
    });
    
    // Update studio ownership
    const updatedStudios = studios.map(s => {
      if (s.id === studioId) {
        return {
          ...s,
          owner: producerId
        };
      }
      return s;
    });
    
    setProducers(updatedProducers);
    setStudios(updatedStudios);
    
    // Add news
    setNewsItems(prev => [
      `${producer.name} has acquired ${studio.name} for ₹${studio.cost.toLocaleString()}!`,
      ...prev.slice(0, 4)
    ]);
    
    return true;
  };

  // Function to collaborate with another producer
  const collaborateWithProducer = (producerId1, producerId2, projectName, budget, terms) => {
    const producer1 = producers.find(p => p.id === producerId1);
    const producer2 = producers.find(p => p.id === producerId2);
    
    if (!producer1 || !producer2) return false;
    
    // Create collaboration record
    const collaboration = {
      id: Date.now(),
      partners: [producerId1, producerId2],
      projectName,
      budget,
      terms,
      year,
      quarter,
      status: "active"
    };
    
    // Update both producers
    const updatedProducers = producers.map(p => {
      if (p.id === producerId1 || p.id === producerId2) {
        return {
          ...p,
          collaborations: [...p.collaborations, collaboration],
          wealth: p.id === producerId1 ? 
            p.wealth - (budget * terms.investmentRatio) : 
            p.wealth - (budget * (1 - terms.investmentRatio))
        };
      }
      return p;
    });
    
    setProducers(updatedProducers);
    
    // Add news
    setNewsItems(prev => [
      `${producer1.name} and ${producer2.name} announce collaboration on "${projectName}"`,
      ...prev.slice(0, 4)
    ]);
    
    return true;
  };

  return (
    <GameContext.Provider value={{
      year,
      quarter,
      producers,
      gamePhase,
      newsItems,
      nominations,
      oscarWinner,
      gameHistory,
      availableActors,
      availableDirectors,
      marketTrends,
      randomEvents,
      studios,
      festivals,
      createMovie,
      advanceQuarter,
      advanceYear,
      startOscarNominations,
      revealOscarWinner,
      purchaseStudio,
      collaborateWithProducer,
      movieGenres,
      movieBudgets,
      movieTypes,
      setGamePhase,
      setProducers
    }}>
      {children}
    </GameContext.Provider>
  );
};