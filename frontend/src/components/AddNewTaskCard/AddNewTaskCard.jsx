// components/Task/AddNewTaskCard.jsx
export default function AddNewTaskCard({ onClick }) {
  return (
    <div
      className="flex items-center justify-between bg-yellow-100 rounded-2xl p-4 shadow hover:bg-yellow-200 transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">➕</span>
        <p className="text-base font-semibold text-gray-800">Add new task</p>
      </div>
    </div>
  );
}