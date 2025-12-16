import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "admin" ? children : <Navigate to="/login" replace />;
};

export default AdminProtected;
