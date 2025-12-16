import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import type { IAppointment } from "../../Types/types";

const GetAllAppointmentsByAdmin = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get("/admin/getAllAppointments");

        setAppointments(res.data.appointments || []);
      } catch {
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <Typography textAlign="center" mt={4}>
        Loading appointments...
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
      <Typography variant="h4" mb={3} textAlign="center">
        All Appointments
      </Typography>

      <Grid container spacing={2}>
        {appointments.map((appt) => (
          <Grid item xs={12} md={6} lg={4} key={appt._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                background: "#f7f9fc",
              }}
            >
              <CardContent>

                {/* Status */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {appt.approved && !appt.cancelled && (
                    <Chip label="Approved" color="success" />
                  )}
                  {appt.cancelled && (
                    <Chip label="Cancelled" color="error" />
                  )}
                  {!appt.approved && !appt.cancelled && (
                    <Chip label="Pending" color="warning" />
                  )}
                </div>

                {/* Doctor Info */}
                <Typography variant="h6" fontWeight="bold">
                  Doctor: {appt.doctorId?.name}
                </Typography>
                <Typography variant="body2">
                  Email: {appt.doctorId?.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Speciality: {appt.doctorId?.speciality}
                </Typography>

                {/* Patient Info */}
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Patient: {appt.patientId?.name}
                </Typography>
                <Typography variant="body2">
                  Email: {appt.patientId?.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Phone: {appt.patientId?.phone}
                </Typography>

                {/* Appointment Timing */}
                <Typography variant="body1" mt={1}>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.date).toLocaleDateString()}
                </Typography>

                <Typography variant="body1">
                  <strong>Time:</strong> {appt.startTime} - {appt.endTime}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GetAllAppointmentsByAdmin;