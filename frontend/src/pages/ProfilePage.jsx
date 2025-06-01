import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Erreur lors du chargement du profil');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, 400); // délai de 400ms

    return () => clearTimeout(timeout);
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/me', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profil mis à jour ✅');
    } catch (err) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Chargement du profil en cours...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Aucun utilisateur trouvé.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">👤 Mon profil</h1>

        <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow">
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Prénom</label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                placeholder="Prénom"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Âge</label>
              <input
                name="age"
                value={user.age || ''}
                onChange={handleChange}
                type="number"
                className="border px-3 py-2 rounded w-full"
                placeholder="Âge"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Taille (cm)</label>
              <input
                name="height"
                value={user.height || ''}
                onChange={handleChange}
                type="number"
                className="border px-3 py-2 rounded w-full"
                placeholder="Taille (cm)"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Poids (kg)</label>
              <input
                name="weight"
                value={user.weight || ''}
                onChange={handleChange}
                type="number"
                className="border px-3 py-2 rounded w-full"
                placeholder="Poids (kg)"
              />
            </div>
          </div>

          <button className="w-full bg-purple-600 text-white mt-6 py-2 rounded hover:bg-purple-700 transition">
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}