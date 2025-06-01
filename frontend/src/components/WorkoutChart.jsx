import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WorkoutChart({ workouts }) {
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: sortedWorkouts.map((w) => w.date),
    datasets: [
      {
        label: 'Calories brûlées',
        data: sortedWorkouts.map((w) => w.calories),
        fill: false,
        borderColor: '#9333ea',
        backgroundColor: '#a855f7',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-8">
      <h3 className="text-lg font-bold text-purple-700 mb-3">📊 Évolution des calories</h3>
      <Line data={data} options={options} />
    </div>
  );
}