import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../Validation/registerValidation";
import axiosInstance from "../Instance/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const role = watch("role");

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log("Registration Success:", res.data);
      toast.success("Registration Successful", { autoClose: 2000 });
      navigate("/user/login");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        width: "300px",
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* ROLE */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Select Role"
              margin="normal"
              error={!!errors.role}
              helperText={errors.role?.message as string}
            >
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          )}
        />

        {/* NAME */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Full Name"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          )}
        />

        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email Address"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />
          )}
        />

        {/* DOCTOR FIELDS */}
        {role === "doctor" && (
          <>
            {/* Speciality */}
            <Controller
              name="speciality"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Speciality"
                  margin="normal"
                  error={!!errors.speciality}
                  helperText={errors.speciality?.message as string}
                />
              )}
            />

            {/* Experience */}
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  fullWidth
                  label="Experience (years)"
                  margin="normal"
                  error={!!errors.experience}
                  helperText={errors.experience?.message as string}
                />
              )}
            />
          </>
        )}

        {/* PATIENT FIELDS */}
        {role === "patient" && (
          <>
            {/* Age */}
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  fullWidth
                  label="Age"
                  margin="normal"
                  error={!!errors.age}
                  helperText={errors.age?.message as string}
                />
              )}
            />

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Gender"
                  margin="normal"
                  error={!!errors.gender}
                  helperText={errors.gender?.message as string}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number"
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone?.message as string}
                />
              )}
            />
          </>
        )}

        {/* SUBMIT */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, py: 1.5 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;