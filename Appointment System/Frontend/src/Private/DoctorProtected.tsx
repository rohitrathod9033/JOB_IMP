import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const DoctorProtected: React.FC<Props> = ({ children }) => {
    const role = localStorage.getItem("role");
    
    return role === "doctor" 
        ? children 
        : <Navigate to="/user/login" replace />;
};

export default DoctorProtected;