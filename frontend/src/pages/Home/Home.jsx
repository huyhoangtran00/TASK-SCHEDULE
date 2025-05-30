import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/boards', {
          headers: {
            Authorization:token,
          },
        });

        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setBoards(data || []);
        } else {
          alert('Không thể tải danh sách board');
        }
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Lỗi kết nối server');
      }
    };

    fetchBoards();
  }, []);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Your Boards</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => goToBoard(board.id)}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold text-blue-700">{board.name}</h2>
              <p className="text-gray-600 mt-2 text-sm">
                {board.description || 'No description'}
              </p>
            </div>
          ))}
        </div>

        {boards.length === 0 && (
          <p className="text-center text-gray-500 mt-20">Bạn chưa có board nào. Hãy tạo một cái nhé!</p>
        )}
      </div>
    </div>
  );
}
