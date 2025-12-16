import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import { useState } from "react";
import type { DoctorForm } from "../../Types/types";
import { useNavigate } from "react-router-dom";

const GetDoctorByName = () => {
    const [doctorName, setDoctorName] = useState("");
    const [doctor, setDoctor] = useState<DoctorForm | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!doctorName.trim()) {
            setError("Please enter a Doctor Name");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.get(`/admin/doctorName`, {
                params: { name: doctorName }
            });

            console.log(response.data);
            setDoctor(response.data.doctor);
        } catch (error: any) {
            setDoctor(null);
            setError(error.response?.data?.message || "Something went wrong");
        }
    };


    // handle Update 
    const handleUpdate = () => {
        if (doctor?._id) {
            navigate(`/preview/admin/update-doctor/${doctor._id}`);
        }
    };

    // handle Delete 
    const handleDelete = async () => {
        if (!doctor?._id) return;
        try {
            const response = await axiosInstance.delete(`/admin/doctor/delete/${doctor._id}`);

            alert(response.data.message || "Doctor Deleted Successfully");
            setDoctor(null);
            setDoctorName("");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to delete doctor");
        }
    };



    return (
        <div style={{ maxWidth: 500, margin: "40px auto" }}>
            <h2>Search Doctor by Name</h2>

            <TextField
                fullWidth
                label="Enter Doctor Name"
                variant="outlined"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
            />

            <Button
                variant="contained"
                fullWidth
                style={{ marginTop: 15 }}
                onClick={handleSearch}
            >
                Search
            </Button>

            {error && (
                <Typography color="error" style={{ marginTop: 12 }}>
                    {error}
                </Typography>
            )}

            {doctor && (
                <Card style={{ marginTop: 20 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Doctor Details
                        </Typography>

                        <Typography><b>Name:</b> {doctor.name}</Typography>
                        <Typography><b>Email:</b> {doctor.email}</Typography>
                        <Typography><b>Specialization:</b> {doctor.speciality}</Typography>
                        <Typography><b>Experience:</b> {doctor.experience} years</Typography>

                        <Button variant="outlined" color="success" style={{ marginTop: 15 }} onClick={handleUpdate}>Update</Button>
                        <Button variant="outlined" color="error" style={{ marginTop: 15, marginLeft: 10 }} onClick={handleDelete}>Delete</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default GetDoctorByName;