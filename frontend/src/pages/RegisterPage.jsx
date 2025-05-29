import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    height: '',
    weight: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setSuccess('');
      return;
    }

    try {
      const { confirmPassword, ...formData } = form;
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setSuccess('Inscription réussie');
      setError('');

      // Redirection vers dashboard après 1 sec
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('Erreur lors de l’inscription');
      setSuccess('');
    }
  };

  return (
    <section className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-600 text-sm">
            Vous avez déjà un compte ?
            <Link to="/login" className="ml-1 text-purple-600 hover:underline">
              Se connecter
            </Link>
          </p>

          {error && (
            <div className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded">{error}</div>
          )}
          {success && (
            <div className="text-sm text-green-600 bg-green-100 px-4 py-2 rounded">{success}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nom complet</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                required
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                required
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                required
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="age"
                type="number"
                placeholder="Âge"
                value={form.age}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                name="height"
                type="number"
                placeholder="Taille (cm)"
                value={form.height}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                name="weight"
                type="number"
                placeholder="Poids (kg)"
                value={form.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-tr from-purple-800 to-pink-500 text-white p-12 rounded-tl-[20px] rounded-bl-[20px]">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6 leading-tight">Rejoins FitTracker</h2>
          <p className="text-lg">
            Une application pensée pour ton bien-être physique et mental. Suis tes progrès, reste motivé(e), et atteins tes objectifs.
          </p>
          <ul className="mt-6 space-y-3 text-white font-medium">
            <li>✅ Statistiques claires</li>
            <li>✅ Interface intuitive</li>
            <li>✅ Objectifs personnalisés</li>
            <li>✅ Gratuit pour les utilisateurs enregistrés</li>
          </ul>
        </div>
      </div>
    </section>
  );
}