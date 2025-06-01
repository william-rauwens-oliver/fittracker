import React, { useEffect, useState } from 'react';
import { fetchWgerExercises } from '../api/wger';

const WgerExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const data = await fetchWgerExercises();
        setExercises(data);
        console.log('Exercices Wger récupérés :', data);
      } catch (error) {
        console.error('Erreur lors du chargement des exercices Wger', error);
      }
    };

    getExercises();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          📋 Exercices Wger
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{ex.name}</h3>

              {ex.category && (
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Catégorie :</strong> {ex.category.name}
                </p>
              )}

              {ex.muscles.length > 0 && (
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Muscles :</strong> {ex.muscles.map((m) => m.name).join(', ')}
                </p>
              )}

              {ex.description && (
                <div
                  className="text-sm text-gray-700 mb-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: ex.description }}
                />
              )}

              {ex.images.length > 0 ? (
                <div className="w-full aspect-video rounded overflow-hidden">
                  <img
                    src={ex.images[0].image}
                    alt={`Illustration ${ex.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Pas d’image disponible</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WgerExercises;