import { useState } from 'react';
import axios from 'axios';

export default function AddWorkoutForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    duration: '',
    calories: '',
    exercises: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const workout = {
        ...form,
        exercises: form.exercises
          ? form.exercises.split(',').map((e) => e.trim())
          : [],
      };

      const res = await axios.post('http://localhost:5000/api/workouts', workout, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAdd(res.data);
      setMessage('Séance ajoutée ✅');
      setForm({ title: '', date: '', duration: '', calories: '', exercises: '' });
    } catch (err) {
      setMessage('Erreur lors de l’ajout.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-3 text-purple-700">➕ Ajouter une séance</h3>
      {message && <p className="text-sm mb-2 text-green-600">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          name="title"
          placeholder="Nom de la séance"
          value={form.title}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
        />
        <input
          name="duration"
          type="number"
          placeholder="Durée (min)"
          value={form.duration}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
          required
        />
        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
          className="px-3 py-2 border rounded"
          required
        />
      </div>

      <input
        name="exercises"
        placeholder="Exercices (séparés par virgules)"
        value={form.exercises}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded mb-3"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Ajouter la séance
      </button>
    </form>
  );
}