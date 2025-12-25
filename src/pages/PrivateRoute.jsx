import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('userName'); // Check session storage
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;