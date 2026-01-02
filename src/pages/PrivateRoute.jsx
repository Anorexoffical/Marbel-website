import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check both storages and support token-based auth
  const isAuthenticated = Boolean(
    localStorage.getItem('userName') ||
    localStorage.getItem('authToken') ||
    sessionStorage.getItem('userName') ||
    sessionStorage.getItem('authToken')
  );

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;