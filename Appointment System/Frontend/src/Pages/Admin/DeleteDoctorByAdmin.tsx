import { useState } from "react";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";

const DeleteDoctorByAdmin = () => {
  const [doctorId, setDoctorId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!doctorId.trim()) {
      setError("Please enter Doctor ID");
      return;
    }

    setError("");
    setMessage("");

    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const response = await axiosInstance.delete(`/admin/doctor/${doctorId}`);

      setMessage(response.data.message || "Doctor deleted successfully");
      setDoctorId("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete doctor");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Delete Doctor by Admin
          </Typography>

          <TextField
            fullWidth
            label="Enter Doctor ID"
            variant="outlined"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="error"
            style={{ marginTop: 15 }}
            onClick={handleDelete}
          >
            Delete Doctor
          </Button>

          {error && (
            <Typography color="error" style={{ marginTop: 15 }}>
              {error}
            </Typography>
          )}

          {message && (
            <Typography color="success.main" style={{ marginTop: 15 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteDoctorByAdmin;