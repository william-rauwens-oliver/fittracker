import { useState } from 'react';
import axios from 'axios';

export default function AddGoalForm({ onAdd }) {
  const [type, setType] = useState('');
  const [target_value, setTargetValue] = useState('');
  const [unit, setUnit] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/goals',
        { type, target_value, unit },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAdd(res.data);
      setMessage('Objectif ajouté !');
      setType('');
      setTargetValue('');
      setUnit('');
    } catch (err) {
      setMessage('Erreur lors de l’ajout.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md border border-gray-200">
      <h3 className="text-md font-semibold text-purple-700 mb-3">+ Ajouter un objectif</h3>
      {message && <p className="text-sm mb-2 text-green-600">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Type (ex: Perte de poids)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 border rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Valeur"
          value={target_value}
          onChange={(e) => setTargetValue(e.target.value)}
          className="px-3 py-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Unité (kg, min, etc.)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="px-3 py-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 transition w-full"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}