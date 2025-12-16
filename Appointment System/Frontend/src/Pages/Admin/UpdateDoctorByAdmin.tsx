import { useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Instance/axiosInstance";
import { useForm } from "react-hook-form";
import type { DoctorForm } from "../../Types/types";

const UpdateDoctorByAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorForm>({
        defaultValues: {
            name: "",
            email: "",
            speciality: "",
            experience: 0
        }
    });

    const fetchDoctor = async () => {
        try {
            const response = await axiosInstance.get(`/admin/doctor/${id}`);
            const doctor = response.data.doctor;

            reset({
                name: doctor.name,
                email: doctor.email,
                speciality: doctor.speciality,
                experience: doctor.experience
            });

        } catch (error: any) {
            console.log(error.response?.data?.message || "Failed to load doctor data");
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const onSubmit = async (data: DoctorForm) => {
        try {
            const response = await axiosInstance.put(`/admin/doctor/update/${id}`, data);
            console.log("Doctor Updated", response.data);
            alert("Doctor updated successfully!");
            navigate("/preview/admin/all-doctors");
        } catch (error: any) {
            console.log(error.response?.data?.message || "Failed to update doctor");
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: "40px auto" }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Update Doctor
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            {...register("name", { required: "Name is required" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            style={{ marginBottom: 15 }}
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            style={{ marginBottom: 15 }}
                        />

                        <TextField
                            label="Specialization"
                            fullWidth
                            variant="outlined"
                            {...register("speciality", { required: "Specialization is required" })}
                            error={!!errors.speciality}
                            helperText={errors.speciality?.message}
                            style={{ marginBottom: 15 }}
                        />

                        <TextField
                            label="Experience (years)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            {...register("experience", { required: "Experience is required" })}
                            error={!!errors.experience}
                            helperText={errors.experience?.message}
                            style={{ marginBottom: 15 }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Update Doctor
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateDoctorByAdmin;
