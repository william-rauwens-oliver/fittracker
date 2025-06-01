// src/api/wger.js
import axios from 'axios';

export const fetchWgerExercises = async () => {
  const res = await axios.get('https://wger.de/api/v2/exerciseinfo/', {
    params: {
      language: 2, // Anglais
      limit: 20
    }
  });
  return res.data.results;
};