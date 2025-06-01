import axios from 'axios';

export const fetchExercises = async () => {
  const res = await axios.get('https://wger.de/api/v2/exercise/');
  return res.data.results;
};