import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement du profil');
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/user/me', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profil mis à jour ✅');
    } catch (err) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">👤 Mon profil</h1>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow">
        {message && <p className="text-green-600 mb-4">{message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" value={user.name} onChange={handleChange} className="border px-3 py-2 rounded" placeholder="Nom" />
          <input name="email" value={user.email} onChange={handleChange} className="border px-3 py-2 rounded" placeholder="Email" />
          <input name="age" value={user.age || ''} onChange={handleChange} type="number" className="border px-3 py-2 rounded" placeholder="Âge" />
          <input name="height" value={user.height || ''} onChange={handleChange} type="number" className="border px-3 py-2 rounded" placeholder="Taille (cm)" />
          <input name="weight" value={user.weight || ''} onChange={handleChange} type="number" className="border px-3 py-2 rounded" placeholder="Poids (kg)" />
        </div>
        <button className="w-full bg-purple-600 text-white mt-4 py-2 rounded hover:bg-purple-700">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}