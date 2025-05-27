// src/pages/Board.jsx
import React from 'react';
import TaskCard from '../../components/Task/TaskCard'; // Adjust the import path as necessary
const tasks = [
  {
    title: "Task in Progress",
    icon: "⏰",
    color: "bg-yellow-300",
  },
  {
    title: "Task Completed",
    icon: "🏆",
    color: "bg-green-300",
  },
  {
    title: "Task Won’t Do",
    icon: "☕",
    color: "bg-red-200",
  },
  {
    title: "Task To Do",
    icon: "📚",
    color: "bg-blue-100",
    description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
  },
];

export default function Board() {
  return (
    <div className="max-w-md mx-auto py-10 px-4 font-sans">
      <h1 className="text-3xl text-black font-bold flex items-center gap-2 mb-1">
        <span className="text-yellow-500">📚</span> My Task Board <span className="text-lg">✏️</span>
      </h1>
      <p className="text-gray-500 mb-6">Tasks to keep organised</p>

      <div className="flex flex-col gap-4">
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            icon={task.icon}
            color={task.color}
            description={task.description}
          />
        ))}

        {/* Add New Task */}
        <div className="flex items-center justify-between bg-yellow-100 rounded-2xl p-4 shadow hover:bg-yellow-200 transition cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="text-2xl">➕</span>
            <p className="text-base font-semibold text-gray-800">Add new task</p>
          </div>
        </div>
      </div>
    </div>
  );
}
