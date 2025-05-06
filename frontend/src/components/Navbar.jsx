import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-700">FitTracker</Link>

      {token && (
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-purple-700">Dashboard</Link>
          <Link to="/profil" className="text-gray-700 hover:text-purple-700">Profil</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}