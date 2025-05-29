import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg flex flex-col justify-between z-50">
      <div>
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FitTracker
          </Link>
        </div>

        {token && (
          <nav className="flex flex-col gap-4 p-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/profil"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Profil
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-gray-700 hover:text-red-600 transition-colors duration-200"
            >
              Déconnexion
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}