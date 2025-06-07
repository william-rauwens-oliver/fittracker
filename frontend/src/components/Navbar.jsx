import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger bouton mobile */}
      <div className="lg:hidden p-4 flex justify-between items-center shadow-md bg-white fixed top-0 left-0 right-0 z-50">
        <Link to="/" className="text-xl font-bold text-blue-600">
          FitTracker
        </Link>
        <button onClick={toggleMenu}>
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg flex-col justify-between z-50">
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
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/profil"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-gray-700 hover:text-red-600 transition"
              >
                Déconnexion
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Menu déroulant mobile/tablette */}
      {isOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 right-0 bg-white shadow-md z-40">
          {token && (
            <nav className="flex flex-col gap-4 p-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/profil"
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={toggleMenu}
              >
                Profil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-left text-gray-700 hover:text-red-600 transition"
              >
                Déconnexion
              </button>
            </nav>
          )}
        </div>
      )}
    </>
  );
}