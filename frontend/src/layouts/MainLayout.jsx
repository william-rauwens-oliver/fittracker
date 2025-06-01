// src/layouts/MainLayout.jsx
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <main className={`${!hideNavbar ? 'ml-[250px]' : ''} w-full min-h-screen bg-gray-100`}>
        {children}
      </main>
    </div>
  );
}