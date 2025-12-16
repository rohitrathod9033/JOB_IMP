import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const AdminProtected: React.FC<Props> = ({ children }) => {
    const role = localStorage.getItem("role");
    
    return role === "admin" 
        ? children 
        : <Navigate to="/user/login" replace />;
};

export default AdminProtected;