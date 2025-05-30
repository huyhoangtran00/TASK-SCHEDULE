import { useState } from "react";
import { X } from "lucide-react";

export default function AddTaskModal({ onClose, onSave }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    icon: "☕",
    status: "In Progress",
  });

  const icons = ["🧑‍💻", "💬", "⚪", "☕", "🏆", "📚", "⏰"];
  const statuses = ["In Progress", "Completed", "Won't Do"];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl relative border border-gray-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Task Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Description</label>
          <textarea
            placeholder="Enter a short description"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Icon</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {icons.map((icon) => (
              <button
                key={icon}
                className={`text-2xl p-2 rounded-xl border transition-all ${
                  task.icon === icon
                    ? "bg-blue-100 border-blue-500 scale-105"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setTask({ ...task, icon })}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-600">Status</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {statuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                  task.status === status
                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setTask({ ...task, status })}
              >
                {status === "Completed" && <span className="text-green-600">✅</span>}
                {status === "Won't Do" && <span className="text-red-600">❌</span>}
                {status === "In Progress" && <span className="text-yellow-600">⏳</span>}
                <span className="text-sm text-gray-700">{status}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm font-semibold"
            onClick={() => onSave(task)}
          >
            Create Task ✓
          </button>
        </div>
      </div>
    </div>
  );
}
