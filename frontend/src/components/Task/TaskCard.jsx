import React from "react";

export default function TaskCard({ title, icon, color, description }) {
  return (
    <div className={`rounded-2xl p-4 shadow ${color} transition`}>
      <div className="flex justify-between items-center">
        {/* LEFT: icon + text */}
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-1">{icon}</div>
          <div>
            <p className="text-base font-semibold text-gray-800">{title}</p>
            {description && (
              <p className="text-sm text-gray-700 mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* RIGHT: status icon (✔️ ❌ ... tùy) */}
        {title === "Task Completed" && (
          <div className="text-white bg-green-500 rounded-full p-1 text-sm">✔️</div>
        )}
        {title === "Task Won’t Do" && (
          <div className="text-white bg-red-500 rounded-full p-1 text-sm">❌</div>
        )}
        {title === "Task in Progress" && (
          <div className="text-white bg-orange-400 rounded-full p-1 text-sm">➡️</div>
        )}
      </div>
    </div>
  );
}
