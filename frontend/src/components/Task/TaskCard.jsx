import React from "react";

export default function TaskCard({ title, icon, color, description, onClick }) {
  const statusIcon = (() => {
    switch (title) {
      case "Task Completed":
        return { icon: "✔️", bg: "bg-green-500" };
      case "Task Won’t Do":
        return { icon: "❌", bg: "bg-red-500" };
      case "Task in Progress":
        return { icon: "➡️", bg: "bg-orange-400" };
      default:
        return null;
    }
  })();

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 shadow ${color} transition cursor-pointer hover:opacity-90`}
    >
      <div className="flex justify-between items-start gap-4 flex-wrap">
        {/* LEFT: icon + content */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Icon wrapper */}
          <div className="bg-white rounded-xl shadow p-2 text-xl shrink-0">
            {icon}
          </div>

          {/* Text content */}
          <div className="min-w-0">
            <p className="text-base font-semibold text-gray-800 break-words">{title}</p>
            {description && (
              <p className="text-sm text-gray-700 mt-1 break-words">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: status icon */}
        {statusIcon && (
          <div
            className={`text-white ${statusIcon.bg} rounded-full p-2 text-sm shadow shrink-0`}
          >
            {statusIcon.icon}
          </div>
        )}
      </div>
    </div>
  );
}
