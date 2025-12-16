import { useEffect, useState } from 'react';
import AdminPreview from "../Preview/AdminPreview"
import PatientPreview from "../Preview/PatientPreview"
import DoctorPreview from "../Preview/DoctorPreview"
import Home from "../Components/Home"

const Preview = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const updateRole = () => {
            const role = localStorage.getItem("role");
            console.log("ROLE FROM PREVIEW : ", role);
            setRole(role ? role.trim().toLowerCase() : null);
        };

        window.addEventListener("roleChanged", updateRole);
        updateRole();
        return () => window.removeEventListener("roleChanged", updateRole);
    }, []);

    if (!role) {
        return <Home />;
    }

    return (
        <>
            {role === "admin" && <AdminPreview />}
            {role === "doctor" && <DoctorPreview />}
            {role === "patient" && <PatientPreview />}
        </>
    );
}

export default Preview;
