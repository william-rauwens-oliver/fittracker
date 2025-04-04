// src/App.js
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 mb-6 rounded">
        <h1 className="text-2xl font-bold text-center text-blue-600">🎯 FitTracker</h1>
      </header>

      <main className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <p className="text-gray-700 mb-4">Bienvenue dans ton tableau de bord sportif personnalisé !</p>
      </main>
    </div>
  );
}

export default App; // ✅ Cette ligne est obligatoire