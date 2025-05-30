import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useBoardStore } from "../../store/boardStore";
import BoardModal from "../../components/BoardModal/BoardModal";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
export default function Home() {
  const { boards, fetchBoards, createBoard, updateBoard, deleteBoard } = useBoardStore();
  const [showModal, setShowModal] = useState(false);
  const [currentBoard, setCurrentBoard] = useState(null);

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateClick = () => {
    setCurrentBoard(null);
    setShowModal(true);
  };

  const handleEditClick = (board) => {
    setCurrentBoard(board);
    setShowModal(true);
  };

  const handleSave = async (boardData) => {
    if (currentBoard) {
      await updateBoard(currentBoard.id, boardData);
    } else {
      await createBoard(boardData);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (currentBoard) {
      await deleteBoard(currentBoard.id);
    }
    setShowModal(false);
  };



  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              🚀 My Task Boards
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Organize your tasks into dedicated boards
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">Create New Board</span>
            </button>

            <LogoutButton/>

          </div>
        </div>

        {boards.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto max-w-md">
              <div className="text-7xl mb-6">📋</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No boards yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first task board
              </p>
              <button
                onClick={handleCreateClick}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Create First Board
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <div 
                key={board.id} 
                className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(board)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
                
                <Link to={`/board/${board.id}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{board.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {board.description || "No description"}
                        </p>
                      </div>
                      <div className="text-3xl ml-4">📌</div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between">
                      <div className="text-sm text-gray-500">
                        Created: {new Date(board.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-indigo-600 font-medium">View →</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <BoardModal
          board={currentBoard}
          onSave={handleSave}
          onDelete={currentBoard ? handleDelete : null}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
