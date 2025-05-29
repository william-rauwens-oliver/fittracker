import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import AddGoalForm from '../components/AddGoalForm';
import AddWorkoutForm from '../components/AddWorkoutForm';

import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

// Lazy-load du composant graphique
const WorkoutChart = lazy(() => import('../components/WorkoutChart'));

export default function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      console.time('fetchData');
      try {
        const [goalsRes, workoutsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/goals', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/workouts', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setGoals(goalsRes.data);
        setWorkouts(workoutsRes.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données', err);
      }
      console.timeEnd('fetchData');
    };

    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white px-6 py-10 ml-[260px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Objectifs */}
        <section className="bg-white rounded-xl shadow border border-gray-200 p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-500" />
            <h2 className="text-lg font-semibold">Objectifs</h2>
          </div>

          <AddGoalForm onAdd={(newGoal) => setGoals([newGoal, ...goals])} />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {goals.slice(0, 6).map((goal) => (
              <div
                key={goal.id}
                className="p-4 bg-gray-50 border border-gray-100 rounded-md shadow-sm hover:shadow transition"
              >
                <div className="font-semibold text-gray-800">{goal.type}</div>
                <div className="text-sm text-gray-600">
                  Objectif : {goal.target_value} {goal.unit}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Séances */}
        <section className="bg-white rounded-xl shadow border border-gray-200 p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <FireIcon className="h-6 w-6 text-orange-500" />
            <h2 className="text-lg font-semibold">Séances d’entraînement</h2>
          </div>

          <AddWorkoutForm onAdd={(newWorkout) => setWorkouts([newWorkout, ...workouts])} />

          <ul className="mt-4 space-y-3">
            {workouts.slice(0, 6).map((w) => (
              <li
                key={w.id}
                className="p-4 bg-gray-50 border border-gray-100 rounded-md shadow-sm hover:shadow transition"
              >
                <div className="font-semibold text-gray-800">{w.title}</div>
                <div className="text-sm text-gray-600">
                  {w.date} – {w.duration} min – {w.calories} kcal
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Statistiques */}
        <section className="bg-white rounded-xl shadow border border-gray-200 p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Statistiques</h2>
          </div>

          <Suspense fallback={<p className="text-gray-500">Chargement du graphique…</p>}>
            {workouts.length > 1 ? (
              <WorkoutChart workouts={workouts} />
            ) : (
              <p className="text-gray-500">Ajoutez plus de séances pour visualiser les statistiques.</p>
            )}
          </Suspense>
        </section>
      </div>
    </div>
  );
}