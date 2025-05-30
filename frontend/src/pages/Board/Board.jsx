import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 
import TaskCard from "../../components/Task/TaskCard";
import TaskDetailModal from "../../components/TaskDetailModal/TaskDetailModal";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import AddNewTaskCard from "../../components/AddNewTaskCard/AddNewTaskCard";
import { useTaskStore } from "../../store/store";

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

  // ✅ Gọi fetchTasks với boardId từ URL
  useEffect(() => {
    if (boardId) {
      fetchTasks(boardId);
    }
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
      await addTask({ ...task, board_id : boardId }); // 
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
    }
    setShowModal(false);
  };

return (
  <div className="min-h-screen w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      {/* Tiêu đề chính */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
        📚 My Task Board
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Tasks in board <span className="font-semibold text-blue-600">#{boardId}</span>
      </p>

      {/* Danh sách task */}
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
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
        ))}
        <AddNewTaskCard onClick={handleAddClick} />
      </div>
    </div>

    {/* Modal */}
    {showModal &&
      (isEditing ? (
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
