import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  // Ví dụ: kiểm tra token trong localStorage
  const isAuthenticated = !!localStorage.getItem('token'); // Thay bằng logic xác thực thực tế

  if (!isAuthenticated) {
    // Chưa đăng nhập - chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập - hiển thị component con
  return children;
};

export default ProtectedRoute;