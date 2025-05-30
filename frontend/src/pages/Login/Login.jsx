import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError('');

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('token', data.token);
        navigate('/board');
      } else {
        setServerError(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setServerError('Lỗi kết nối đến server');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Đăng nhập</h2>
        <p className="text-sm text-center text-gray-600 mb-4">Nhập thông tin tài khoản để tiếp tục</p>

        {serverError && <p className="text-red-500 text-center text-sm mb-4">{serverError}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
