import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import type { DoctorForm } from "../../Types/types";

const DoctorList = () => {
  const [doctors, setDoctors] = useState<DoctorForm[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/admin/getAllDoctors");

        if (res.data.success) {
          setDoctors(res.data.doctors || []);
        } else {
          setError("Failed to load doctors");
        }
      } catch {
        setError("Something went wrong in Doctor List");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <Typography textAlign="center" mt={4}>
        Loading doctors...
      </Typography>
    );
  }

  // Error UI
  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Doctors
      </Typography>

      <Grid container spacing={3} marginTop={1}>
        {doctors.map((doctor) => (
          <Grid key={doctor._id}>
            <Card sx={{ borderRadius: 3, padding: 1 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {doctor.name}
                </Typography>

                <Typography>Email: {doctor.email}</Typography>
                <Typography>Speciality: {doctor.speciality}</Typography>
                <Typography>Experience: {doctor.experience} years</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Doctors Found */}
      {doctors.length === 0 && (
        <Typography
          variant="h6"
          textAlign="center"
          marginTop={4}
          color="gray"
        >
          No Doctors Found
        </Typography>
      )}
    </div>
  );
};

export default DoctorList;
