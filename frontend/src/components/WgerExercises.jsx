import { useEffect, useState } from 'react';
import { fetchExercises } from '../api/wger';

export default function WgerExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises().then(setExercises);
  }, []);

  return (
    <div className="mt-6 bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Suggestions d’exercices (via API Wger)</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((ex) => (
          <li key={ex.id} className="bg-gray-50 p-4 border border-gray-100 rounded-md shadow-sm hover:shadow transition">
            <p className="text-gray-800 font-medium">{ex.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}