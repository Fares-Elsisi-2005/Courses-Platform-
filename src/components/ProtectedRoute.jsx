// src/components/ProtectedRoute.jsx
 
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // redirect to home if not allowed
  }

  return children;
};

export default ProtectedRoute;
