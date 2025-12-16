import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const PatientProtected: React.FC<Props> = ({ children }) => {
    const role = localStorage.getItem("role");

    return role === "patient"
        ? children
        : <Navigate to="/user/login" replace />;
};

export default PatientProtected;