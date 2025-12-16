import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Instance/axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../Validation/Validation";

import { Box, Card, CardContent, TextField, Typography, Button, Link } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.jwtToken);
      console.log(res.data.role);

      window.dispatchEvent(new Event("roleChanged"));

      toast.success("Login Successfully", { autoClose: 2000 });

      if (res.data.role === "admin") {
        navigate("/admin");
      }

      if (res.data.role === "member") {
        navigate("/user");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "whitesmoke" }}>
      <Card sx={{ width: 300, p: 2, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>Login</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Email" type="email" variant="outlined" sx={{ mt: 1.5, mb: 1 }} {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

            <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mt: 1, mb: 1 }} {...register("password")} error={!!errors.password} helperText={errors.password?.message} />

            <Button variant="contained" fullWidth type="submit" sx={{ mt: 1, py: 1.5 }}>Login</Button>

            <Typography sx={{ textAlign: "center", mt: 1.5 }}>
              Don’t have an account? <Link component={RouterLink} to="/register" underline="hover">Register</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
