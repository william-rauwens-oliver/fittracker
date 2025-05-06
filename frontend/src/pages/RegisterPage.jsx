import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setSuccess('Inscription réussie !');
      setError('');
      // Redirection future vers dashboard ici
    } catch (err) {
      setError('Erreur lors de l’inscription');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Créer un compte</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <input name="name" type="text" placeholder="Nom" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border px-3 py-2 rounded" required />
          <input name="age" type="number" placeholder="Âge" value={form.age} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="height" type="number" placeholder="Taille (cm)" value={form.height} onChange={handleChange} className="border px-3 py-2 rounded" />
          <input name="weight" type="number" placeholder="Poids (kg)" value={form.weight} onChange={handleChange} className="border px-3 py-2 rounded" />
        </div>

        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 mb-4 rounded" required />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          S’inscrire
        </button>
      </form>
    </div>
  );
}