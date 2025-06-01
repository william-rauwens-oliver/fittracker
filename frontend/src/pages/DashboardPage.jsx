import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import AddGoalForm from '../components/AddGoalForm';
import AddWorkoutForm from '../components/AddWorkoutForm';
import GoalItem from '../components/GoalItem';
import WgerExercises from '../components/WgerExercises';

import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

const WorkoutChart = lazy(() => import('../components/WorkoutChart'));

export default function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
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
        console.error('Erreur chargement données', err);
      }
    };

    fetchData();
  }, [token]);

useEffect(() => {
  const notifyUser = () => {
    if (Notification.permission === 'granted') {
      new Notification("🏋️ Rappel FitTracker", {
        body: "N’oublie pas ton entraînement aujourd’hui !",
        icon: "/185590.png", // optionnel : tu peux ajouter une icône
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification("🏋️ Rappel FitTracker", {
            body: "N’oublie pas ton entraînement aujourd’hui !",
            icon: "/185590.png",
          });
        }
      });
    }
  };

  const timer = setTimeout(() => {
    notifyUser();
  }, 5000); // pour test rapide – à remplacer par 1000 * 60 * 60 * 20

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Objectifs */}
        <section className="bg-white rounded-xl shadow border border-gray-200 p-6 lg:col-span-3">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-500" />
            <h2 className="text-lg font-semibold">Objectifs</h2>
          </div>

          <AddGoalForm onAdd={(newGoal) => setGoals([newGoal, ...goals])} />

          {editingGoal && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Modifier l’objectif</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await axios.put(
                      `http://localhost:5000/api/goals/${editingGoal.id}`,
                      {
                        type: editingGoal.type,
                        target_value: editingGoal.target_value,
                        unit: editingGoal.unit,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setGoals((prev) =>
                      prev.map((g) => (g.id === editingGoal.id ? res.data : g))
                    );
                    setEditingGoal(null);
                  } catch (err) {
                    console.error('Erreur modification', err);
                  }
                }}
              >
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  value={editingGoal.type}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, type: e.target.value })
                  }
                  placeholder="Type"
                />
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  type="number"
                  value={editingGoal.target_value}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, target_value: e.target.value })
                  }
                  placeholder="Valeur"
                />
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  value={editingGoal.unit}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, unit: e.target.value })
                  }
                  placeholder="Unité"
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded">Enregistrer</button>
                  <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditingGoal(null)}>Annuler</button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {goals.slice(0, 6).map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onDelete={async (id) => {
                  await axios.delete(`http://localhost:5000/api/goals/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setGoals(goals.filter((g) => g.id !== id));
                }}
                onEdit={(goal) => setEditingGoal(goal)}
              />
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

          {editingWorkout && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="font-semibold mb-2">Modifier la séance</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await axios.put(
                      `http://localhost:5000/api/workouts/${editingWorkout.id}`,
                      {
                        title: editingWorkout.title,
                        date: editingWorkout.date,
                        duration: editingWorkout.duration,
                        calories: editingWorkout.calories,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setWorkouts((prev) =>
                      prev.map((w) => (w.id === editingWorkout.id ? res.data : w))
                    );
                    setEditingWorkout(null);
                  } catch (err) {
                    console.error('Erreur modification', err);
                  }
                }}
              >
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  value={editingWorkout.title}
                  onChange={(e) =>
                    setEditingWorkout({ ...editingWorkout, title: e.target.value })
                  }
                  placeholder="Titre"
                />
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  type="date"
                  value={editingWorkout.date}
                  onChange={(e) =>
                    setEditingWorkout({ ...editingWorkout, date: e.target.value })
                  }
                />
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  type="number"
                  value={editingWorkout.duration}
                  onChange={(e) =>
                    setEditingWorkout({ ...editingWorkout, duration: e.target.value })
                  }
                  placeholder="Durée (min)"
                />
                <input
                  className="block mb-2 w-full p-2 border rounded"
                  type="number"
                  value={editingWorkout.calories}
                  onChange={(e) =>
                    setEditingWorkout({ ...editingWorkout, calories: e.target.value })
                  }
                  placeholder="Calories"
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">Enregistrer</button>
                  <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditingWorkout(null)}>Annuler</button>
                </div>
              </form>
            </div>
          )}

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
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditingWorkout(w)}
                    className="text-sm text-blue-500"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={async () => {
                      await axios.delete(`http://localhost:5000/api/workouts/${w.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setWorkouts(workouts.filter((wo) => wo.id !== w.id));
                    }}
                    className="text-sm text-red-500"
                  >
                    Supprimer
                  </button>
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

        {/* Suggestions Wger */}
        <section className="lg:col-span-3">
          <WgerExercises />
        </section>
      </div>
    </div>
  );
}