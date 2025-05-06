import { useEffect, useState } from 'react';
import axios from 'axios';
import AddGoalForm from '../components/AddGoalForm';
import AddWorkoutForm from '../components/AddWorkoutForm';
import WorkoutChart from '../components/WorkoutChart';
import LogoutButton from '../components/LogoutButton';

export default function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchGoals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/goals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (err) {
        console.error('Erreur chargement objectifs');
      }
    };

    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(res.data);
      } catch (err) {
        console.error('Erreur chargement séances');
      }
    };

    fetchGoals();
    fetchWorkouts();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* ✅ Titre + Déconnexion */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Tableau de bord</h1>
        <LogoutButton />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">🎯 Objectifs sportifs</h2>

        <AddGoalForm onAdd={(newGoal) => setGoals([newGoal, ...goals])} />

        {goals.length === 0 ? (
          <p className="text-gray-500">Aucun objectif défini.</p>
        ) : (
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li key={goal.id} className="bg-white rounded shadow p-3 border">
                <strong>{goal.type}</strong> – {goal.target_value} {goal.unit}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">💪 Séances d’entraînement</h2>

        <AddWorkoutForm onAdd={(newWorkout) => setWorkouts([newWorkout, ...workouts])} />

        {workouts.length === 0 ? (
          <p className="text-gray-500">Aucune séance enregistrée.</p>
        ) : (
          <ul className="space-y-2">
            {workouts.map((w) => (
              <li key={w.id} className="bg-white rounded shadow p-3 border">
                <div className="font-bold">{w.title}</div>
                <div className="text-sm text-gray-500">
                  {w.date} – {w.duration} min – {w.calories} kcal
                </div>
              </li>
            ))}
          </ul>
        )}

        {workouts.length > 1 && <WorkoutChart workouts={workouts} />}
      </section>
    </div>
  );
}