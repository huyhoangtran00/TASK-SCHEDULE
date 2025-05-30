import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TaskCard from "../../components/Task/TaskCard";
import TaskDetailModal from "../../components/TaskDetailModal/TaskDetailModal";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import AddNewTaskCard from "../../components/AddNewTaskCard/AddNewTaskCard";
import { useTaskStore } from "../../store/taskStore";
import { useBoardStore } from "../../store/boardStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
export default function Board() {
  const {
    tasks,
    selectedTask,
    fetchTasks,
    selectTask,
    clearSelectedTask,
    addTask,
    updateTask,
    deleteTask,
  } = useTaskStore();

  const { boardId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const { 
    selectedBoard, 
    fetchBoard, 
    clearSelectedBoard 
  } = useBoardStore();

  // Fetch tasks and board info
  useEffect(() => {
    if (boardId) {
      fetchTasks(boardId);
      fetchBoard(boardId);
    }
    
    return () => clearSelectedBoard();
  }, [boardId]);

  const handleAddClick = () => {
    clearSelectedTask();
    setIsEditing(false);
    setShowModal(true);
  };

  const handleTaskClick = (task) => {
    selectTask(task);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async (task) => {
    if (isEditing && selectedTask) {
      await updateTask(selectedTask.id, task);
    } else {
      await addTask({ ...task, board_id: boardId });
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
    }
    setShowModal(false);
  };

  // Tính toán thống kê
  const taskStats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
    wontDo: tasks.filter(t => t.status === "Won't Do").length, };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">All Boards</span>
          </Link>
          
          <button 
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Task</span>
          </button>

          
        </div>

        {/* Board Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-start">
            <div className="text-4xl mr-4">{selectedBoard?.icon || "📋"}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedBoard?.name || "My Task Board"}
              </h1>
              <p className="text-gray-600">
                {selectedBoard?.description || "Manage your tasks in this board"}
              </p>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <StatCard 
            label="Total" 
            value={taskStats.total} 
            color="bg-gray-100 text-gray-800"
          />
   
          <StatCard 
            label="In Progress" 
            value={taskStats.inProgress} 
            color="bg-yellow-100 text-yellow-800"
          />
          <StatCard 
            label="Completed" 
            value={taskStats.completed} 
            color="bg-green-100 text-green-800"
          />
          <StatCard 
            label="Won't Do" 
            value={taskStats.wontDo} 
            color="bg-red-100 text-red-800"
          />
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.name}
                icon={task.icon}
                description={task.description}
                color={
                  task.status === "In Progress"
                    ? "bg-yellow-300"
                    : task.status === "Completed"
                    ? "bg-green-300"
                    : task.status === "Won't Do"
                    ? "bg-red-200"
                    : "bg-blue-100"
                }
                onClick={() => handleTaskClick(task)}
              />
            ))
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center border border-dashed border-gray-300">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first task
              </p>
              <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Task
              </button>
            </div>
          )}
          
          {tasks.length > 0 && (
            <AddNewTaskCard onClick={handleAddClick} />
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (isEditing ? (
        <TaskDetailModal
          task={selectedTask}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setShowModal(false)}
        />
      ) : (
        <AddTaskModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      ))}
    </div>
  );
}

// Component hỗ trợ hiển thị thống kê
function StatCard({ label, value, color }) {
  return (
    <div className={`${color} rounded-xl p-4 shadow-sm`}>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

// Component PlusIcon nếu chưa có
function PlusIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}