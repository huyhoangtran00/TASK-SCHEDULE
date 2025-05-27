import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đăng nhập thành công!');
        console.log('Đăng nhập thành công:', data);
        localStorage.setItem('token', data.token);
        // navigate('/dashboard');
      } else {
        console.error('Lỗi:', data.message);
        alert(`Đăng nhập thất bại: ${data.message}`);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
      alert('Lỗi kết nối đến server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray px-4">
      <div className="w-full h-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Login to account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Enter your credentials to access your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 text-black border border-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter a password"
            className="w-full px-4 py-2 text-black border border-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Not a member?{' '}
          <a href="register" className="text-blue-500 hover:underline font-medium">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
