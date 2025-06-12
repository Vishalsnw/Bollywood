// src/features/producers/producerUtils.js

// 32 Producer names provided by user
export const PRODUCER_NAMES = [
  "Golu", "Amit Bagle", "Mangesh", "Vasim", "Amit Randhe", "Khushi", "Ajinkya", "Vinay",
  "Aashish", "Ashok Singh", "Sandip Basra", "Gokul", "Ritesh", "Bipin", "Ajit Bonde", "Amol Patil",
  "Hemant", "Ravi Patil", "Sachin Pardesi", "Sachin Patil", "Vishal", "Nitin", "Dipak Trivedi",
  "Sunil", "Charu", "Bhavesh Chaudhari", "Dipak R", "Mayur", "Nilesh", "Dipak BH", "Sunil"
];

// Util function to generate initial producers array with attributes
export function initializeProducers() {
  // Ensure unique producer names (in case of duplicates)
  const uniqueNames = Array.from(new Set(PRODUCER_NAMES));
  return uniqueNames.map((name, idx) => ({
    id: idx + 1,
    name,
    wealth: 100000, // 1 Lakh INR initial
    oscars: 0,
    movies: [],
    loan: 0,
    netWorthHistory: [100000], // Track year-wise net worth
    isActive: true, // For future use (bankrupt etc.)
  }));
    }
