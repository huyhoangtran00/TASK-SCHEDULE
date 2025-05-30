import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    setError('');
    setServerError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:45000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đăng ký thành công!');
        localStorage.setItem('token', data.token);
        window.location.href = `/board/${data.boardId}`;
      } else {
        setServerError(data.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setServerError('Lỗi kết nối đến server');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 px-4">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Đăng ký</h2>
        <p className="text-sm text-center text-gray-600 mb-4">Tạo tài khoản mới</p>

        {(error || serverError) && (
          <p className="text-red-500 text-center text-sm mb-4">{error || serverError}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition active:scale-95"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-green-600 hover:underline font-medium">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
