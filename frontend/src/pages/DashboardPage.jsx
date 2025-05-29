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
        console.error('Erreur lors du chargement des objectifs');
      }
    };

    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorkouts(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des séances');
      }
    };

    fetchGoals();
    fetchWorkouts();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">FitTracker</h1>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Objectifs</h2>
          <AddGoalForm onAdd={(newGoal) => setGoals([newGoal, ...goals])} />
          <ul className="mt-4 space-y-2">
            {goals.map((goal) => (
              <li key={goal.id} className="border rounded p-3">
                <div className="font-semibold">{goal.type}</div>
                <div className="text-sm text-gray-600">
                  Cible : {goal.target_value} {goal.unit}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Workouts Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Séances</h2>
          <AddWorkoutForm onAdd={(newWorkout) => setWorkouts([newWorkout, ...workouts])} />
          <ul className="mt-4 space-y-2">
            {workouts.map((w) => (
              <li key={w.id} className="border rounded p-3">
                <div className="font-semibold">{w.title}</div>
                <div className="text-sm text-gray-600">
                  {w.date} – {w.duration} min – {w.calories} kcal
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Chart Section */}
        <section className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Statistiques</h2>
          {workouts.length > 1 ? (
            <WorkoutChart workouts={workouts} />
          ) : (
            <p className="text-gray-600">Ajoutez plus de séances pour voir les statistiques.</p>
          )}
        </section>
      </main>
    </div>
  );
}