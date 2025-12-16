import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import axiosInstance from "../../Instance/axiosInstance";
import type { IAppointment } from "../../Types/types";

const DoctorViewAppointmentList = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get("/doctor/appointments/view");
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Approve Button 
  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`/doctor/appointment/accept/${id}`);
      console.log(" Hanlde Approve Dcotor ID: ", id);

      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, approved: true, cancelled: false } : apt
        )
      );
    } catch (err) {
      console.error("Approve Error:", err);
    }
  };

  // Reject Button
  const handleReject = async (id: string) => {
    try {
      await axiosInstance.put(`/doctor/appointment/reject/${id}`);
      console.log(" Hanlde Reject Dcotor ID: ", id);

      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, approved: false, cancelled: true } : apt
        )
      );
    } catch (err) {
      console.error("Reject Error:", err);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Doctor Appointments List
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        appointments.map((apt) => (
          <Card key={apt._id} sx={{ mb: 2, p: 2 }}>
            <CardContent>
              {/* Patient Info */}
              <Typography variant="h6" fontWeight="bold">
                {apt.patientId?.name}
              </Typography>
              <Typography>Email: {apt.patientId?.email}</Typography>
              {apt.patientId?.phone && (
                <Typography>Phone: {apt.patientId.phone}</Typography>
              )}
              <Typography>
                Age : {apt.patientId?.age} | Gender: {apt.patientId?.gender}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Appointment Info */}
              <Typography>
                Date : <strong>{new Date(apt.date).toDateString()}</strong>
              </Typography>
              <Typography>
                Time : <strong>{apt.startTime}</strong> - {" "}
                <strong>{apt.endTime}</strong>
              </Typography>

              <Box mt={2}>
                {apt.cancelled ? (
                  <Chip label="Rejected" color="error" />
                ) : apt.approved ? (
                  <Chip label="Approved" color="success" />
                ) : (
                  <Chip label="Pending" color="warning" />
                )}
              </Box>

              {/* Buttons */}
              {!apt.approved && !apt.cancelled && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(apt._id!)}>
                    Approve
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(apt._id!)}>
                    Reject
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default DoctorViewAppointmentList;
