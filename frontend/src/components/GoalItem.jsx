export default function GoalItem({ goal, onDelete, onEdit }) {
  return (
    <div className="p-4 bg-gray-50 border rounded shadow-sm hover:shadow transition">
      <div className="font-semibold text-gray-800">{goal.type}</div>
      <div className="text-sm text-gray-600">
        Objectif : {goal.target_value} {goal.unit}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(goal)}
          className="text-blue-600 text-sm hover:underline"
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-red-600 text-sm hover:underline"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}