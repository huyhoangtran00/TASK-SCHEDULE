import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  boards: [],
  selectedBoard: null,
  isLoading: false,
  error: null,

  setBoards: (boards) => set({ boards }),
  selectBoard: (board) => set({ selectedBoard: board }),
  clearSelectedBoard: () => set({ selectedBoard: null }),

  fetchBoards: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching boards with token:', token);
      const response = await fetch('/api/boards', {
        headers: { Authorization: token },
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) throw new Error(data.message);
      set({ boards: data, error: null });
    } catch (error) {
      console.error('Error fetching boards:', error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },


  fetchBoard: async (id) => {
  set({ isLoading: true });
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/boards/${id}`, {
      headers: { Authorization: token },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    set({ selectedBoard: data, error: null }); // Giả sử bạn có biến `selectedBoard` trong store
  } catch (error) {
    set({ error: error.message });
  } finally {
    set({ isLoading: false });
  }
},
  createBoard: async (boardData) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(boardData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({
        boards: [...state.boards, data],
        error: null,
      }));
      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateBoard: async (boardId, boardData) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(boardData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === boardId ? { ...board, ...data } : board
        ),
        error: null,
      }));
      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBoard: async (boardId) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      set((state) => ({
        boards: state.boards.filter((board) => board.id !== boardId),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 