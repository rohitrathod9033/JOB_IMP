import { useForm } from "react-hook-form";
import axiosInstance from "../../Instance/axiosInstance";
import type { DoctorForm } from "../../Types/types";
import { toast } from "react-toastify";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const AddDoctorByAdmin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorForm>();

  const onSubmit = async (data: DoctorForm) => {
    try {
      const res = await axiosInstance.post("/admin/doctor/add", data);
      toast.success(res.data.message, { autoClose: 2000 });
      reset();
    } catch {
      toast.error("Something went wrong Add Doctor by admin");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Add Doctor (Admin)
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ mb: 2 }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
            />

            {/* Speciality */}
            <TextField
              fullWidth
              label="Speciality"
              variant="outlined"
              placeholder="Cardiology"
              {...register("speciality")}
              sx={{ mb: 2 }}
            />

            {/* Experience */}
            <TextField
              fullWidth
              label="Experience (Years)"
              type="number"
              variant="outlined"
              {...register("experience", { valueAsNumber: true })}
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2 }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddDoctorByAdmin;
