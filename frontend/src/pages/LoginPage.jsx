import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setSuccess('Connexion réussie ! Redirection en cours...');
      setError('');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (err) {
      setError('Identifiants incorrects');
      setSuccess('');
    }
  };

  return (
    <section className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Connexion</h1>
          <p className="text-gray-600 text-sm">
            Vous n’avez pas de compte ?
            <Link to="/register" className="ml-1 text-purple-600 hover:underline">
              S’inscrire
            </Link>
          </p>

          {error && (
            <div className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded">{error}</div>
          )}
          {success && (
            <div className="text-sm text-green-600 bg-green-100 px-4 py-2 rounded">{success}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-tr from-purple-800 to-pink-500 text-white p-12 rounded-tl-[20px] rounded-bl-[20px]">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6 leading-tight">Bienvenue sur FitTracker</h2>
          <p className="text-lg">
            Connecte-toi pour retrouver ton espace personnalisé, suivre ta progression et rester motivé(e) au quotidien.
          </p>
          <ul className="mt-6 space-y-3 text-white font-medium">
            <li>✅ Données centralisées</li>
            <li>✅ Objectifs clairs</li>
            <li>✅ Suivi intelligent</li>
            <li>✅ Gratuit pour les utilisateurs inscrits</li>
          </ul>
        </div>
      </div>
    </section>
  );
}