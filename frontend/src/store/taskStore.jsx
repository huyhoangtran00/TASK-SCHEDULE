
import { create } from 'zustand';

// Hàm tiện ích để lấy headers có token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token
  };
};

export const useTaskStore = create((set, get) => ({
  tasks: [],
  selectedTask: null,


  fetchTasks: async (boardId) => {
    try {
      const res = await fetch(`http://backend:3000/api/boards/${boardId}/tasks`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      const data = await res.json();
      set({ tasks: data });
    } catch (error) {
      console.error("Lỗi khi fetch tasks theo board:", error);
    }
  },

  selectTask: (task) => set({ selectedTask: task }),
  clearSelectedTask: () => set({ selectedTask: null }),

  // Add task
  addTask: async (task) => {
    console.log("Adding task:", task); // Debug log
    try {
      const res = await fetch('http://backend:3000/api/tasks', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      set({ tasks: [...get().tasks, newTask] });
    } catch (err) {
      console.error("Lỗi khi thêm task:", err);
    }
  },

  // Update task
  updateTask: async (id, updates) => {
    try {
      const res = await fetch(`http://backend:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      set({
        tasks: get().tasks.map((task) => (task.id === id ? updated : task)),
      });
    } catch (err) {
      console.error("Lỗi khi cập nhật task:", err);
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      await fetch(`http://backend:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      set({
        tasks: get().tasks.filter((task) => task.id !== id),
        selectedTask: null,
      });
    } catch (err) {
      console.error("Lỗi khi xoá task:", err);
    }
  },
}));
