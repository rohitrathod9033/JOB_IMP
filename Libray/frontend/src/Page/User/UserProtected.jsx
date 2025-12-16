import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const role = localStorage.getItem("role");

  return role === "member" ? children : <Navigate to="/login" replace />;
};

export default UserProtected;