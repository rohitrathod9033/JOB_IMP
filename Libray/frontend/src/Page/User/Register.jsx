// import React, { useState, } from 'react'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../Instance/axiosInstance';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "member",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await axiosInstance.post("/auth/register", formData);
//       console.log(res);
//       console.log(res.data);
//       toast.success("Register Successfully", {
//         position: "top-right",
//         autoClose: 5000
//       });
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Register Failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Register</h2>

//         <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Create Password" onChange={handleChange} />

//         <select name="role" placeholder="Select Role" value={formData.role} onChange={handleChange}>
//           <option value="member">Member</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button onClick={handleSubmit}>Register</button>

//         <p>
//           Already have an account? <br />
//           <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Register


import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Instance/axiosInstance';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidation } from '../../Validation/Validation';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerValidation),
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log(res);
      console.log(res.data);

      toast.success("Register Successfully", {
        position: "top-right",
        autoClose: 2000
      });

      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Register Failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "whitesmoke", textAlign: "center"
      }}>

      <Box
        sx={{
          width: 300, background: "#fff", p: 4, borderRadius: 3,
        }}>

        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <TextField label="Enter Name" fullWidth sx={{ mb: 1, mt: 2 }} {...register("name")} error={!!errors.name} helperText={errors.name?.message} />

          {/* Email */}
          <TextField label="Enter Email" fullWidth sx={{ mb: 1 }} {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

          {/* Password */}
          <TextField label="Create Password" type="password" fullWidth sx={{ mb: 1 }} {...register("password")} error={!!errors.password} helperText={errors.password?.message} />

          {/* Role */}
          <FormControl fullWidth sx={{ mb: 1 }} error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" defaultValue="" {...register("role")}>
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              {errors.role?.message}
            </Typography>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, p: 1.5 }}>
            Register
          </Button>
        </form>

        <Typography sx={{ mt: 2 }} textAlign="center">
          Already have an account? <br />
          <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box >
  );
};

export default Register;